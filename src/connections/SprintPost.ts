export const postSprintCount = async (sprintCount: number) => {
	try {
		const response = await fetch("http://localhost:8080/sprints", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				n_sprints: sprintCount,
			}),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();

		return data;
	} catch (error) {
		console.error("Error:", error);
	}
};
