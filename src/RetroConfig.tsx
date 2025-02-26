import { Card } from "./renderers/components/atoms/card/Card";
import { Icon } from "./renderers/components/atoms/icons/Icon";
import { Typography } from "./renderers/components/atoms/typographies/Typography";
import { Button } from "./renderers/components/molecules/button/Button";
import { SelectInput } from "./renderers/components/molecules/inputs/select-input/SelectInput";

export const RetroConfig = () => {
  return (
    <Card size="lg">
      <Typography.Heading3>Configure Retro</Typography.Heading3>

      <hr />

      <div className="grid grid-cols-3 gap-4">
        <Card size="md" className="p-5 gap-4">
          <SelectInput
            label="Select a Sprint"
            placeholder="Select a sprint"
            items={[]}
            dataAnalyticsId=""
            ariaLabel=""
          />
          <Typography.Caption color="secondary">
            Select the sprint to run the restrospective on.
          </Typography.Caption>
        </Card>

        <Card size="md" className="p-5 gap-4">
          <SelectInput
            label="Compare it to"
            placeholder="Compare it to"
            items={[]}
            dataAnalyticsId=""
            ariaLabel=""
          />
          <Typography.Caption color="secondary">
            Compare the selected sprint to these sprints.
          </Typography.Caption>
        </Card>

        <Card size="md" className="p-5 gap-4">
          <SelectInput
            label="Select a Sprint"
            placeholder="Retrospective Categories"
            items={[]}
            dataAnalyticsId=""
            ariaLabel=""
          />

          <Typography.Caption color="secondary">
            Choose retrospective categories for the Ai to generate.
          </Typography.Caption>
        </Card>
      </div>

      <Button size="xl">
        <Icon icon="PlayIcon" className="fill-white size-4 mr-[10px]" />
        Generate Retrospective
      </Button>
    </Card>
  );
};
