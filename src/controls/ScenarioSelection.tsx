import { Tab, TabList, TabPanel, TabPanels, Tabs, TabsOrientation } from "@reach/tabs";
import "@reach/tabs/styles.css";

import { ScenarioName } from "../data-types";

export function ScenarioSelection({
    value,
    onChange
}) {

    return (
      <Tabs
        className="my-4"
        orientation={TabsOrientation.Vertical}
        index={parseInt(value.substring(1), 10) - 1}
        onChange={(index) => onChange(`w${index + 1}` as ScenarioName)}
      >
        <TabList>
          <Tab key="w1">Stakeholder</Tab>
          <Tab key="w2">Environmental</Tab>
          <Tab key="w3">Social</Tab>
        </TabList>
        <TabPanels>
          <TabPanel className="text-center h-full p-2 align-middle">
            Stakeholder weighting
          </TabPanel>
          <TabPanel className="text-center h-full p-2 align-middle">
            Environmental weighting
          </TabPanel>
          <TabPanel className="text-center h-full p-2 align-middle">
            Social weighting
          </TabPanel>
        </TabPanels>
      </Tabs>
    );
}
