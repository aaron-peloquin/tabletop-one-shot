import { Card, GridTemplate } from "@components-layout";
import { OverviewOrganism } from '../organisms/OverviewOrganism'

const GRID_TEMPLATE_AREA =`
"prompt_overview___ generated_overview generated_overview"
`

export const HomeTemplate = () => {
  return <Card layer="1" heading="Tabletop One Shot Generator">
    <GridTemplate
      gridTemplateAreas={GRID_TEMPLATE_AREA}
      justifyItems="center"
      textAlign='left'
      columns={3}
    >
      <OverviewOrganism
        gridNameInput="prompt_overview___" // corresponding to GRID_TEMPLATE_AREA
        gridNameOutput="generated_overview" // corresponding to GRID_TEMPLATE_AREA
      />
    </GridTemplate>
  </Card>
}
