import { hrefForArticleId, hrefForCollectionId } from "@/constants/intercom-links";
import type { FC } from "react";
import { Icon } from "../../atoms/icons/Icon";
import { Link } from "../link/Link";
import { Tooltip } from "../tooltip/Tooltip";

type WithArticleId = {
  articleId?: string | null;
  externalLink?: never;
};

type WithExternalLink = {
  articleId?: never;
  externalLink?: string | null;
};

export type LearnMoreLinkProps = (WithArticleId | WithExternalLink) & { collectionId?: string | null };

export const LearnMoreLink: FC<LearnMoreLinkProps> = (props) => {
  if (!isValid(props)) return null;
  const href = getHref(props);
  return (
    <Link link={{ to: href, target: "_blank", rel: "noreferrer" }} dataAnalyticsId="learn-more-link">
      <Tooltip
        title="Learn more"
        trigger={<Icon icon="InfoIcon" className="size-3 fill-gray-500 hover:fill-gray-700" />}
      />
    </Link>
  );
};

const isValid = ({ articleId, collectionId, externalLink }: LearnMoreLinkProps) =>
  Boolean(articleId || collectionId || externalLink);

function getHref({ articleId, collectionId, externalLink }: LearnMoreLinkProps) {
  if (articleId) {
    return hrefForArticleId(articleId);
  }

  if (collectionId) {
    return hrefForCollectionId(collectionId);
  }

  if (externalLink) {
    return externalLink;
  }

  throw new Error("Invalid LearnMoreLinkProps");
}
