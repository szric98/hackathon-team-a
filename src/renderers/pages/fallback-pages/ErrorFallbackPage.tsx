import type { FC } from "react";

import { Typography } from "../../components/atoms/typographies/Typography";
import { Link } from "../../components/molecules/link/Link";
import { Logo } from "../../components/molecules/logo/Logo";

import { CenteredContent, MainLayout } from "../../templates/common";

export const ErrorFallbackPage: FC = () => {
  return (
    <MainLayout>
      <CenteredContent>
        <div className="mx-auto max-w-screen-xl grid-cols-2 content-center gap-8 px-16 py-8 md:grid">
          <div className="self-center">
            <div className="mb-8">
              <Logo size="md" withText />
            </div>
            <Typography.Heading1 color="error" className="mb-2">
              500 Internal Error
            </Typography.Heading1>
            <Typography.Heading1 className="text-4xl">Whoops! Something went wrong.</Typography.Heading1>

            <Typography.Body color="secondary" className="mt-8 mb-2.5">
              Please try again or contact us below.
            </Typography.Body>
            <ul className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
              <li>
                {/* TODO: LATER OPEN INTERCOM CHAT??? */}
                <Link link={{ to: "#", className: "underline" }} dataAnalyticsId="error-page__support-link">
                  Support
                </Link>
              </li>
            </ul>
          </div>
          <img
            className="mx-auto mb-4 hidden md:flex"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/500/500.svg"
            alt="500 Server Error"
          />
        </div>
      </CenteredContent>
    </MainLayout>
  );
};
