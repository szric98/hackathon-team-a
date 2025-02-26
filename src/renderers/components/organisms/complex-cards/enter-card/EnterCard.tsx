import type { FC } from "react";
import { Card } from "../../../atoms/card/Card";
import { Typography } from "../../../atoms/typographies/Typography";
import { Button } from "../../../molecules/button/Button";
import { Link } from "../../../molecules/link/Link";
import { Logo } from "../../../molecules/logo/Logo";

export type EnterCardProps = {
  onClickEnter: () => void;
};

export const EnterCard: FC<EnterCardProps> = ({ onClickEnter }) => {
  return (
    <Card size="lg" highlight className="z-10 max-w-sm">
      <Logo size="xs" withText />
      <Typography.Heading2>Sign in to Plandek</Typography.Heading2>
      <div className="flex flex-col gap-3">
        <Button
          size="xl"
          onClick={onClickEnter}
          data-testid="enter-page__login-card__enter-button"
          dataAnalyticsId="enter-page__login-card__enter-button"
        >
          Enter
        </Button>
        <Typography.Body color="secondary">
          If your company doesn’t have an account yet, please{" "}
          <Link
            typography={{ variant: "Body" }}
            link={{ to: "https://plandek.com/form/sign-up/", target: "_blank", rel: "noreferrer" }}
            dataAnalyticsId="enter-page__login-card__create-new-account-link"
          >
            create your account
          </Link>{" "}
          and get started free today.
        </Typography.Body>
      </div>
    </Card>
  );
};
