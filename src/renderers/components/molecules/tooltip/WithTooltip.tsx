import { useCallback, useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Tooltip, type TooltipProps } from "./Tooltip";

interface WithTooltipProps<C> {
	additionalCondition?: boolean;
	tooltipProps: Omit<TooltipProps, "trigger">;
	componentProps: C;
	Component: React.ComponentType<C>;
}

// This only works with display: 'block' or '-webkit-box' elements. The latter is used by line-clamp-{NUMBER} Tailwind class.
// TODO: investigate if there's a universal solution that doesn't depend on the component's display type. Ticket: PLAN-8538
export const WithTooltip = <C,>({
	Component,
	tooltipProps,
	additionalCondition = true,
	componentProps,
}: WithTooltipProps<C>) => {
	const uniqueContainerId = useMemo(() => uuidv4(), []);
	const needsTooltip = useIsTruncated(uniqueContainerId);

	const component = <Component {...componentProps} id={uniqueContainerId} />;

	if (needsTooltip && additionalCondition) {
		return <Tooltip trigger={component} {...tooltipProps} />;
	}

	return component;
};

const textElementTagNames = ["p", "span", "h1", "h2", "h3"] as const;
type TextElementTagName = (typeof textElementTagNames)[number];

const checkTextTruncation = (containerId: string): boolean => {
	const labelContainer = document.getElementById(containerId);

	if (!labelContainer) return false;

	const textElements: HTMLElement[] = [];

	// Check if the labelContainer itself is a text element
	if (
		textElementTagNames.includes(
			labelContainer.tagName.toLowerCase() as TextElementTagName,
		)
	) {
		textElements.push(labelContainer);
	}

	// Add all child text elements
	for (const tag of textElementTagNames) {
		textElements.push(...Array.from(labelContainer.getElementsByTagName(tag)));
	}

	if (!textElements.length) return false;
	let textIsTrimmed = false;

	for (const textElement of textElements) {
		textIsTrimmed =
			textElement.scrollWidth > textElement.clientWidth ||
			textElement.scrollHeight > textElement.clientHeight;

		if (textIsTrimmed) break;
	}

	return textIsTrimmed;
};

const useIsTruncated = (containerId: string) => {
	const [needsTooltip, setNeedsTooltip] = useState(false);

	const checkTextTruncationWrapper = useCallback(() => {
		setNeedsTooltip(checkTextTruncation(containerId));
	}, [containerId]);

	useEffect(() => {
		checkTextTruncationWrapper();
		window.addEventListener("resize", checkTextTruncationWrapper);
		return () => {
			window.removeEventListener("resize", checkTextTruncationWrapper);
		};
	}, [checkTextTruncationWrapper]);

	return needsTooltip;
};
