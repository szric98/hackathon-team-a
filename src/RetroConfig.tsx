import { useState } from "react";
import { Card } from "./renderers/components/atoms/card/Card";
import { Icon } from "./renderers/components/atoms/icons/Icon";
import { Typography } from "./renderers/components/atoms/typographies/Typography";
import { Button } from "./renderers/components/molecules/button/Button";
import { SelectInput } from "./renderers/components/molecules/inputs/select-input/SelectInput";
import { postSprintCount } from "./connections/SprintPost";

export const RetroConfig = () => {
	const [sprintNumber, setSprintNumber] = useState<string>("1");
	const [postSprintState, setPostSprintState] = useState<unknown>(null);

	console.log(postSprintState);

	return (
		<Card size="lg">
			<Typography.Heading3>Configure Retro</Typography.Heading3>

			<hr />

			<div className="grid grid-cols-3 gap-4">
				<Card size="md" className="p-5 gap-4">
					<SelectInput
						label="Select a Sprint"
						placeholder="Select a sprint"
						items={[{ label: "Sprint 49", key: "49" }]}
						dataAnalyticsId=""
						ariaLabel=""
						valueKey={"49"}
					/>
					<Typography.Caption color="secondary">
						Select the sprint to run the restrospective on.
					</Typography.Caption>
				</Card>

				<Card size="md" className="p-5 gap-4">
					<SelectInput
						label="Compare it to"
						placeholder="Compare it to"
						items={[
							{ label: "Last Sprint", key: "1" },
							{ label: "Last 2 Sprints", key: "2" },
							{ label: "Last 3 Sprints", key: "3" },
							{ label: "Last 4 Sprints", key: "4" },
						]}
						dataAnalyticsId=""
						ariaLabel=""
						onSelect={(value) => setSprintNumber(value?.key ?? "1")}
						valueKey={"1"}
					/>
					<Typography.Caption color="secondary">
						Compare the selected sprint to these sprints.
					</Typography.Caption>
				</Card>

				<Card size="md" className="p-5 gap-4">
					<SelectInput
						label="Select a Sprint"
						placeholder="Retrospective Categories"
						items={[{ label: "Start, Stop, Continue", key: "ssc" }]}
						dataAnalyticsId=""
						ariaLabel=""
						valueKey={"ssc"}
					/>

					<Typography.Caption color="secondary">
						Choose retrospective categories for the Ai to generate.
					</Typography.Caption>
				</Card>
			</div>

			<Button
				onClick={() =>
					setPostSprintState(postSprintCount(Number.parseInt(sprintNumber)))
				}
				size="xl"
			>
				<Icon icon="PlayIcon" className="fill-white size-4 mr-[10px]" />
				Generate Retrospective
			</Button>
		</Card>
	);
};
