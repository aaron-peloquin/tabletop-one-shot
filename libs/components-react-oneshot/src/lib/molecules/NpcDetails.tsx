import { Button, Card, GridArea, GridTemplate } from "@components-layout";
import { useGenerateStats } from "@helper";
import { zodSchemaNPC } from "@static";
import { useCallback, useState } from "react";
import { z } from "zod";

export type T_NPC = z.infer<typeof zodSchemaNPC>;

export const NpcDetails: React.FC<T_NPC> = ({name, physicalDescription, backstory, challengeRating, motivations, classification}) => {
  const { generateStats, loadingStats, stats } = useGenerateStats({name, physicalDescription, challengeRating, classification});
  const [currentHp, setCurrentHp] = useState<number>(0);
  const handleSetHealth = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = parseInt(event.target.value);
    setCurrentHp(newVal === 0 ? -1 : newVal);
  }, []);

  return <Card layer="4" heading={name}>
    <Button text={loadingStats ? "Loading..." : "Generate Stats"} onClick={generateStats} disabled={loadingStats} />
    <Card layer="5" heading="Description">{physicalDescription}</Card>
    <Card layer="5" heading="Backstory">{backstory}</Card>
    <Card layer="5" heading="Motivations">{motivations}</Card>
    {stats && <Card layer="4" heading={`${name}'s Stats`}>
      <Card layer="5" heading="Ability Scores">
        <GridTemplate columns={3}>
          <GridArea>STR: {stats.abilityScores.strength}</GridArea>
          <GridArea>DEX: {stats.abilityScores.dexterity}</GridArea>
          <GridArea>CON: {stats.abilityScores.constitution}</GridArea>
          <GridArea>WIS: {stats.abilityScores.wisdom}</GridArea>
          <GridArea>INT: {stats.abilityScores.intelligence}</GridArea>
          <GridArea>CHA: {stats.abilityScores.charisma}</GridArea>
        </GridTemplate>
      </Card>
      <Card layer="5" heading="Combat">
        <GridTemplate columns={2}>
          <GridArea>Init: {stats.initiative}</GridArea>
          <GridArea>HP: <input value={currentHp || stats.hitPoints} type="number" onChange={handleSetHealth} />/{stats.hitPoints}</GridArea>
          <GridArea>AC: {stats.armorClass}</GridArea>
          <GridArea>Speed: {stats.speed}</GridArea>
        </GridTemplate>
      </Card>
      <Card layer="5" heading="Skills">
        <GridTemplate columns={1}>
          <GridArea>Perception: {stats.skills.perception}</GridArea>
          <GridArea>Insight: {stats.skills.insight}</GridArea>
          <GridArea>Stealth: {stats.skills.stealth}</GridArea>
        </GridTemplate>
      </Card>
    </Card>}
  </Card>;
};
