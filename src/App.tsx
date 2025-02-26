import { useState } from "react";
import { Typography } from "./renderers/components/atoms/typographies/Typography";
import { Badge } from "./renderers/components/molecules/badge/Badge";
import { Button } from "./renderers/components/molecules/button/Button";
import { RetroConfig } from "./RetroConfig";
import { SprintRiskLineChart } from "./SprintRiskLineChart";
import { postSprintCount } from "./connections/SprintPost";

export default function App() {
	const [postSprintState, setPostSprintState] = useState<unknown>(null);

	console.log(postSprintState);

	return (
		<div className="flex flex-col gap-6 p-6 bg-gray-50">
			<div className="flex justify-between items-center">
				<div className="flex items-center gap-3">
					<Typography.Heading2>Run a Retro</Typography.Heading2>
					<Badge label="BETA" />
				</div>

				<Button color="alternative">Share</Button>

				<Button onClick={() => setPostSprintState(postSprintCount(1))}>
					Click me
				</Button>
			</div>

			<RetroConfig />

			<SprintRiskLineChart />
		</div>
	);
}
