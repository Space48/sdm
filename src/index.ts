import Conf from "conf";
import { connectors } from "./connectors";
import { ConfConfigRepository, scopeLocator } from "./framework";

export * from "./connectors";

export function defaultScopeLocator() {
  return scopeLocator(connectors, defaultConfigRepository());
}

export function defaultConfigRepository() {
  return new ConfConfigRepository(new Conf);
}
