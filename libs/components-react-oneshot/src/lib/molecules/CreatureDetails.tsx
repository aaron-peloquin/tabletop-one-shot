import React from 'react';
import { Button, Card, GridArea, GridTemplate, Input, Label } from "@components-layout";
import { useGenerateStats } from "@helper";
import { zodSchemaCreature } from "@static";
import { useCallback, useState } from "react";
import { GiDiceTwentyFacesTwenty } from "react-icons/gi";
import { z } from "zod";

export type T_Creature = z.infer<typeof zodSchemaCreature>;

export const CreatureDetails: React.FC<T_Creature> = ({name, description, backstory, cr, classification}) => {
  const { generateStats, loadingStats, stats } = useGenerateStats({name, description, cr, classification});
  const [currentHp, setCurrentHp] = useState<number>(0);
  const handleSetHealth = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = parseInt(event.target.value);
    setCurrentHp(newVal === 0 ? -1 : newVal);
  }, []);

  const statsButtonText = loadingStats ? "Loading..." : `${stats?'Re':''}Generate Stats`;


  return <Card layer="4" heading={`${name} (CR ${cr}, ${classification})`}>
    <Button text={statsButtonText} onClick={generateStats} disabled={loadingStats} />
    <Card layer="5" heading="Description">{description}</Card>
    <Card layer="5" heading="Backstory">{backstory}</Card>
    {/* <Card layer="5" heading="Motivations">{motivations}</Card> */}
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
          <GridArea>Init: {stats.rolledInitiative + stats.initiative} ({stats.rolledInitiative}<GiDiceTwentyFacesTwenty /> +{stats.initiative})</GridArea>
          <GridArea>Speed: {stats.speed}ft</GridArea>
          <GridArea>AC: {stats.armorClass}</GridArea>
          <GridArea><Input value={currentHp || stats.hitPoints} type="number" onChange={handleSetHealth} label={`HP (${stats.hitPoints} max)`} id={`${name} HP`} /></GridArea>
        </GridTemplate>
      </Card>
      {stats.abilities.map(({name, description, toHitOrDc, dmgDice, range, actionType}) => {
        return <Card layer="5" heading={name}>
          <em>{actionType}</em> ({range}ft)<br />
          <strong>{description}</strong><br />
          <GridTemplate columns={2}>
            <Card layer="5" heading="Hit">{toHitOrDc}</Card>
            <Card layer="5" heading="Damage">{dmgDice}</Card>
          </GridTemplate>
        </Card>;
      })}

      {/* <Card layer="5" heading="Skills">
        <GridTemplate columns={1}>
          <GridArea>Perception: {stats.skills.perception}</GridArea>
          <GridArea>Insight: {stats.skills.insight}</GridArea>
          <GridArea>Stealth: {stats.skills.stealth}</GridArea>
        </GridTemplate>
      </Card> */}
    </Card>}
  </Card>;
};
