import { Tab, TabList, TabPanel, TabPanels, Tabs, TabsOrientation } from "@reach/tabs";

import { WeightingName } from "../config/variables";
import { W1Icon, W2Icon, W3Icon } from "../ui/icons";

export function ScenarioSelection({
    value,
    onChange
}) {

    return (
      <Tabs
        className="my-4 h-56 rounded-2xl bg-blue-900 text-white overflow-hidden"
        orientation={TabsOrientation.Vertical}
        index={parseInt(value.substring(1), 10) - 1}
        onChange={(index) => onChange(`w${index + 1}` as WeightingName)}
      >
        <TabList className="bg-gray-300 rounded-2xl rounded-r-none w-18 mr-4 h-full flex flex-col justify-around">
          <Tab
            key="w1"
            className={`flex-1 ${
              value === "w1"
                ? "bg-blue-900 text-white"
                : "bg-gray-300 text-gray-400"
            }`}
          >
            <W1Icon
              fill={value === "w1" ? "white" : "gray"}
              height={36}
              width={36}
            />
          </Tab>
          <Tab
            key="w2"
            className={`flex-1 active:ring-0 ${
              value === "w2" ? "bg-blue-900" : "bg-gray-300"
            }`}
          >
            <W2Icon
              fill={value === "w2" ? "white" : "gray"}
              height={36}
              width={36}
            />
          </Tab>
          <Tab
            key="w3"
            className={`flex-1 ${
              value === "w3"
                ? "bg-blue-900 text-white"
                : "bg-gray-300 text-gray-400"
            }`}
          >
            <W3Icon
              fill={value === "w3" ? "white" : "gray"}
              height={36}
              width={36}
            />
          </Tab>
        </TabList>
        <TabPanels className="w-full p-3">
          <TabPanel className="text-center p-2 rounded-xl align-middle bg-white py-2 px-3 box-border h-full">
            <h3 className="text-l font-extrabold uppercase text-blue-900 text-left">
              Stakeholder scenario
            </h3>
          </TabPanel>
          <TabPanel className="text-center p-2 rounded-xl align-middle bg-white py-2 px-3 box-border h-full">
            <h3 className="text-l font-extrabold uppercase text-blue-900 text-left">
              Environmental scenario
            </h3>
          </TabPanel>
          <TabPanel className="text-center p-2 rounded-xl align-middle bg-white py-2 px-3 box-border h-full">
            <h3 className="text-l font-extrabold uppercase text-blue-900 text-left">
              Social scenario
            </h3>
          </TabPanel>
        </TabPanels>
      </Tabs>
    );
}
