import Conf from "conf";
import { configManagementConnector, regularConnectors } from "./connectors";
import { LocalConfigRepository } from "./framework";
import { Application } from "./framework/application";

export * from "./connectors";
export * from "./framework";

export function sdm() {
  const configRepository = new LocalConfigRepository(new Conf);

  return new Application({
    configRepository,
    connectors: {
      config: configManagementConnector(regularConnectors, configRepository),
      ...regularConnectors,
    },
  });
}
