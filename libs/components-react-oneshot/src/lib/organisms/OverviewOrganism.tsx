import { GridArea, Card, Textarea, Button } from "@components-layout"
import { useCallback, useContext } from "react"
import { globalDataContext } from "../providers/globalData"
import { useGenerateOverview } from "@helper"

type T_Props = {
    gridNameInput: string
    gridNameOutput: string
}

export const OverviewOrganism: React.FC<T_Props> = ({gridNameInput, gridNameOutput}) => {
  const {overview, name, setOverview} = useContext(globalDataContext)

  const {generateOverview, overviewLoading} = useGenerateOverview(setOverview)

  const handleGenerateOverview = useCallback(() => {
    generateOverview(name)
  }, [name])

  const handleOverviewPrompt = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setOverview(event.target.value)
  }, [setOverview])

  const disabled = !name || overviewLoading

  return <>
    <GridArea className='full-width' name={gridNameInput}>
      <Card layer="2" heading="Overview Input">
        <Button text="Generate" disabled={disabled} onClick={handleGenerateOverview} />
      </Card>
    </GridArea>
    <GridArea name={gridNameOutput}>
      <Card layer="2" heading="Overview Output">
        {JSON.stringify(overview)}
        {/* <Textarea
          id="overview"
          label="Session Overview"
          disabled={disabled}
          value={}
          style={{ width: '100%', minHeight: 150 }}
          onChange={handleOverviewPrompt}
        /> */}
        {/* <div className="limited-height">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tortor id aliquet lectus proin nibh nisl condimentum id. Gravida rutrum quisque non tellus orci ac. Vitae sapien pellentesque habitant morbi. Sapien nec sagittis aliquam malesuada. Molestie ac feugiat sed lectus vestibulum mattis ullamcorper. Amet luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor. Morbi non arcu risus quis varius. Nunc aliquet bibendum enim facilisis gravida. Viverra ipsum nunc aliquet bibendum enim facilisis gravida neque. Pellentesque habitant morbi tristique senectus et netus et. Placerat duis ultricies lacus sed turpis tincidunt. Augue neque gravida in fermentum et.
        </div> */}
      </Card>
    </GridArea>
  </>

}