export function intercomShow(): void {
  window.Intercom?.("show");
}

export function intercomHide(): void {
  window.Intercom?.("hide");
}

export function intercomHideDefaultLauncher(value: boolean): void {
  window.Intercom?.("update", { hide_default_launcher: value });
}

export function intercomIdentify(user: { email: string; name: string }): void {
  const intercomUser = {
    email: user.email,
    name: user.name,
  };

  window.Intercom?.("update", intercomUser);
}

export function intercomIdentifyGuest(): void {
  window.Intercom?.("update", { email: null, name: null });
}

export function openGiveFeedback() {
  intercomShow();

  const openInterval = setInterval(() => {
    // biome-ignore lint/suspicious/noExplicitAny: <we allowed this any in the old UI>
    const intercomFrame = document.querySelectorAll<any>('[name="intercom-messenger-frame"]')[0];
    const giveFeedbackButton = intercomFrame.contentDocument.querySelectorAll('[aria-label="Give feedback"]')[0];
    if (intercomFrame && giveFeedbackButton) {
      giveFeedbackButton.click();
      clearInterval(openInterval);
    }
  }, 1000);

  setTimeout(() => {
    clearInterval(openInterval);
  }, 5000);
}

export function openSendUsMessage() {
  intercomShow();

  const openInterval = setInterval(() => {
    // biome-ignore lint/suspicious/noExplicitAny: <we allowed this to be any in the old UI>
    const intercomFrame = document.querySelectorAll<any>('[name="intercom-messenger-frame"]')[0];
    // biome-ignore lint/suspicious/noExplicitAny: <we allowed this to be any in the old UI>
    const everyButton: any[] = Array.from(intercomFrame.contentDocument.querySelectorAll('[role="button"]'));
    // biome-ignore lint/suspicious/noExplicitAny: <we allowed this to be any in the old UI>
    let sendUsMessageButton: any;

    for (const button of everyButton) {
      if (button.innerText.includes("Send us a message")) {
        sendUsMessageButton = button;
        break;
      }
    }

    if (intercomFrame && sendUsMessageButton) {
      sendUsMessageButton.click();
    }
    clearInterval(openInterval);
  }, 1000);

  setTimeout(() => {
    clearInterval(openInterval);
  }, 5000);
}
