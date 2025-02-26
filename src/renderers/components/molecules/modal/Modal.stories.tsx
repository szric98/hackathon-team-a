import { StorybookCenteredLayout } from "@/renderers/templates/StorybookLayout";
import { disableStoryArgs } from "@/utils/disable-story-args";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Typography } from "../../atoms/typographies/Typography";
import { Button } from "../button/Button";
import { MODAL_SIZES, Modal, ModalBody, ModalFooter, type ModalProps, ModalTitle } from "./Modal";

const meta = {
  component: Modal,
  title: "molecules/Modal",
} satisfies Meta<ModalProps>;

type Story = StoryObj<ModalProps>;

export const Main: Story = {
  args: { size: "md" },
  argTypes: {
    ...disableStoryArgs("headerContent", "bodyContent", "footerContent"),
    size: {
      control: "select",
      options: MODAL_SIZES,
    },
  },
  decorators: StorybookCenteredLayout,
  render: ({ size }) => {
    const [openModal, setOpenModal] = useState(false);

    const bodyContent = (
      <div className="space-y-6">
        <Typography.Body color="secondary">
          With less than a month to go before the European Union enacts new consumer privacy laws for its citizens,
          companies around the world are updating their terms of service agreements to comply.
        </Typography.Body>
        <Typography.Body color="secondary">
          The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to
          ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as
          possible of high-risk data breaches that could personally affect them.
        </Typography.Body>
      </div>
    );

    const footerContent = (
      <Button dataAnalyticsId="modal__accept-button" onClick={() => setOpenModal(false)}>
        I accept
      </Button>
    );

    return (
      <>
        <Button dataAnalyticsId="storybook__open-modal-button" onClick={() => setOpenModal(true)}>
          Open modal
        </Button>
        <Modal show={openModal} onClose={() => setOpenModal(false)} size={size}>
          <ModalTitle onClose={() => setOpenModal(false)}>Terms of Service</ModalTitle>
          <ModalBody>{bodyContent}</ModalBody>
          <ModalFooter>{footerContent}</ModalFooter>
        </Modal>
      </>
    );
  },
};

export default meta;
