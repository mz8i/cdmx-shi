import { Tab, TabList, TabPanel, TabPanels, Tabs, TabsOrientation } from "@reach/tabs";
import "@reach/tabs/styles.css";

import { ScenarioName } from "../data-types";

export function ScenarioSelection({
    value,
    onChange
}) {

    return (
      <Tabs
        orientation={TabsOrientation.Vertical}
        index={parseInt(value.substring(1), 10)-1}
        onChange={(index) => onChange(`w${index+1}` as ScenarioName)}
      >
        <TabList>
          <Tab key="w1">Stakeholder</Tab>
          <Tab key="w2">Environmental</Tab>
          <Tab key="w3">Social</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
Stakeholder weighting
          </TabPanel>
          <TabPanel>
Environmental weighting
          </TabPanel>
          <TabPanel>
Social weighting
          </TabPanel>
        </TabPanels>
      </Tabs>
    );
}
