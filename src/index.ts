import Conf from "conf";
import { connectors } from "./connectors";
import { LocalConfigRepository, ConfigRepository, scopeLocator } from "./framework";

export * from "./connectors";
export * from "./framework";

export function defaultScopeLocator() {
  return scopeLocator(connectors, defaultConfigRepository());
}

export function defaultConfigRepository(): ConfigRepository {
  return new LocalConfigRepository(new Conf);
}
