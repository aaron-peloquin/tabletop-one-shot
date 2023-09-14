"use client"
import { GridArea, Card, Textarea } from "@components-layout"
import { useState, useCallback } from "react"

type T_Props = {
    gridNameInput: string
    gridNameOutput: string
}

export const OverviewOrganism: React.FC<T_Props> = ({gridNameInput, gridNameOutput}) => {
  const [overviewPrompt, setOverviewPrompt] = useState('Generate a one-shot for dungeons and dragons where the players need to clear out a small band of goblins from a forest near a small town')
  const handleOverviewPrompt = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setOverviewPrompt(event.target.value)
  }, [])

  return <>
    <GridArea className='full-width' name={gridNameInput}>
      <Card layer="2" heading="Overview Input">
        <Textarea
          id="overviewPrompt"
          label="Overview Prompt"
          value={overviewPrompt}
          style={{ width: '100%', minHeight: 150 }}
          onChange={handleOverviewPrompt}
        />
      </Card>
    </GridArea>
    <GridArea name={gridNameOutput}>
      <Card layer="2" heading="Overview Output">
        <div className="limited-height">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tortor id aliquet lectus proin nibh nisl condimentum id. Gravida rutrum quisque non tellus orci ac. Vitae sapien pellentesque habitant morbi. Sapien nec sagittis aliquam malesuada. Molestie ac feugiat sed lectus vestibulum mattis ullamcorper. Amet luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor. Morbi non arcu risus quis varius. Nunc aliquet bibendum enim facilisis gravida. Viverra ipsum nunc aliquet bibendum enim facilisis gravida neque. Pellentesque habitant morbi tristique senectus et netus et. Placerat duis ultricies lacus sed turpis tincidunt. Augue neque gravida in fermentum et.
        </div>
      </Card>
    </GridArea>
  </>

}