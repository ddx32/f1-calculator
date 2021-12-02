import constructorData from "../data/constructorsData";

export function getTeamByName(name) {
  return constructorData.find((constructor) => constructor.name === name);
}
