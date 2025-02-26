import type { FC } from "react";

import { EnterCard, type EnterCardProps } from "../../components/organisms/complex-cards/enter-card/EnterCard";
import { CenteredContent, MainLayout } from "../../templates/common";

export const EnterPage: FC<EnterCardProps> = ({ onClickEnter }) => {
  return (
    <MainLayout className="dark bg-center bg-cover bg-dark-textured-background">
      <CenteredContent>
        <EnterCard onClickEnter={onClickEnter} />
      </CenteredContent>
    </MainLayout>
  );
};
