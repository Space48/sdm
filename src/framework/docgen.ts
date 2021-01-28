import { ConnectorDefinition, Path } from "./connector";
import * as BinaryApi from "./cli";
import R from "ramda";
import { pipe } from "@space48/json-pipe";

export function explainJsUsage(connector: ConnectorDefinition) {

}

export function explainCliUsage(connector: ConnectorDefinition, commandPrefix: string = ''): string {
  return describeCommands(connector, commandPrefix).join('\n');
}

function describeCommands(resources: ConnectorDefinition, commandPrefix: string): string[] {
  return pipe(
    Path.computeAll(resources),
    R.map(Path.popEndpointName),
    R.map(([resourcePath, endpointName]) => R.pair(
      BinaryApi.encodePath(resourcePath),
      BinaryApi.encodePathElement(endpointName),
    )),
    R.groupBy(([encodedResourcePath]) => encodedResourcePath),
    R.mapObjIndexed(R.map(([, encodedEndpointName]) => encodedEndpointName)),
    R.toPairs,
    R.map(([encodedResourcePath, encodedEndpointNames]) =>
      `${commandPrefix}${encodedResourcePath}\n ↳ ${encodedEndpointNames.sort().join(', ')}\n`)
  );
}
