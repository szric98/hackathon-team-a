import type { FC } from "react";

import { Button } from "../../components/molecules/button/Button";
import { Logo } from "../../components/molecules/logo/Logo";
import { CenteredContent, MainLayout } from "../../templates/common";

type PageProps = {
  redirect: VoidFunction;
};
export const NotFoundFallbackPage: FC<PageProps> = ({ redirect }) => {
  return (
    <MainLayout>
      <CenteredContent>
        <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
          <div className="absolute top-6 left-6">
            <Logo withText size="md" />
          </div>
          <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 font-extrabold text-7xl text-brand-600 tracking-tight lg:text-9xl dark:text-brand-600">
              404
            </h1>
            <p className="mb-4 font-bold text-3xl text-gray-900 tracking-tight md:text-4xl dark:text-white">
              Something's missing.
            </p>
            <p className="mb-4 font-light text-gray-500 text-lg dark:text-gray-400">
              Sorry, we can't find that page. You'll find lots to explore at Plandek.
            </p>
            <Button className="inline-flex" dataAnalyticsId="not-found-page__redirect-falback" onClick={redirect}>
              Back to homepage
            </Button>
          </div>
        </div>
      </CenteredContent>
    </MainLayout>
  );
};
