import {Card, GridArea, GridTemplate, Input, Textarea} from '@components-layout';

const GRID_TEMPLATE_AREA =`
"prompt_overview___ generated_overview generated_overview"
`

export default async function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.scss file.
   */
  return (
    <Card layer="1" heading="Tabletop One Shot Generator">
      <GridTemplate
        gridTemplateAreas={GRID_TEMPLATE_AREA}
        justifyItems="center"
        textAlign='left'
        columns={3}
      >
        <GridArea className='full-width' name="prompt_overview___">
          <Card layer="2" heading="Overview Input">
            <Textarea
              id="prompt_one"
              label="Prompt"
              value="Test"
              style={{ width: '100%' }}
            />
          </Card>
        </GridArea>
        <GridArea name="generated_overview">
          <Card layer="2" heading="Overview Output">
            <div className="limited-height">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tortor id aliquet lectus proin nibh nisl condimentum id. Gravida rutrum quisque non tellus orci ac. Vitae sapien pellentesque habitant morbi. Sapien nec sagittis aliquam malesuada. Molestie ac feugiat sed lectus vestibulum mattis ullamcorper. Amet luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor. Morbi non arcu risus quis varius. Nunc aliquet bibendum enim facilisis gravida. Viverra ipsum nunc aliquet bibendum enim facilisis gravida neque. Pellentesque habitant morbi tristique senectus et netus et. Placerat duis ultricies lacus sed turpis tincidunt. Augue neque gravida in fermentum et.
            </div>
          </Card>
        </GridArea>
      </GridTemplate>
    </Card>
  );
}
