/**
 * @function reactivity(raw)
 * @function watcher(watch)
 *
 * @example ```js
 *    const state = reactivity({
 *      foo: "bar",
 *      bar: "foo",
 *    });
 *
 *    watcher(() => {
 *      console.log("La propriété foo de l'état state a changé", state.foo);
 *    })
 *
 *    watcher(() => {
 *      console.log("La propriété bar de l'état state a changé", state.bar);
 *    })
 *
 *    watcher(() => {
 *      const $el = document.querySelector("...");
 *      *patch($el, state); // ? exemple: met à jour les données d'un élément
 *    });
 *
 *    ...
 *    ...
 *    ...
 *
 *    state.foo = "bla";
 *    state.bar = "foobar";
 * ```
 */

import type { FIXME, Nullable, OBJECT } from "./types.d.ts";

let activeWatch: Nullable<() => void>;

const targetsMap = new WeakMap();

class ReactivityDependencies {
  #subscribers = new Set();

  depend() {
    if (activeWatch) {
      this.#subscribers.add(activeWatch);
    }
  }

  notify() {
    this.#subscribers.forEach((e: FIXME) => e());
  }
}

/**
 * @param {object} raw Un objet à rendre réactif
 */
export const reactivity = <ReactivityType = OBJECT>(raw: ReactivityType) => {
  const getDependencies = (
    target: OBJECT,
    p: PropertyKey,
  ): ReactivityDependencies => {
    let deps = targetsMap.get(target);
    if (!deps) {
      deps = new Map();
      targetsMap.set(target, deps);
    }

    let dep = deps.get(p);
    if (!dep) {
      dep = new ReactivityDependencies();
      deps.set(p, dep);
    }

    return dep;
  };

  const proxyHandlers: ProxyHandler<OBJECT> = {
    get: (target, p, receiver) => {
      const dep = getDependencies(target, p);
      dep.depend();
      return Reflect.get(target, p, receiver);
    },
    set: (target, p, value, receiver) => {
      const dep = getDependencies(target, p);
      const result = Reflect.set(target, p, value, receiver);
      dep.notify();
      return result;
    },
  };

  // @ts-expect-error
  return new Proxy<ReactivityType>(<OBJECT> raw, proxyHandlers);
};

/**
 * @param {CallableFunction} watch fonction à rappeler à chaque
 *   changement d'une propriété de l'objet réactif.
 */
export const watcher = (watch: () => void) => {
  activeWatch = watch;
  watch();
  activeWatch = null;
};
