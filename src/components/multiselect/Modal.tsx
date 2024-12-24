import ReactDOM from "react-dom";
import React, { Fragment, useEffect, useState } from "react";
import classes from "./Modal.module.scss";

interface ModalOverlayProps {
  children: React.ReactNode;
}

interface ModalProps {
  onClose: () => void;
  children?: React.ReactNode;
}

const Backdrop: React.FC<{ onClose: () => void }> = (props: any) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay: React.FC<ModalOverlayProps> = (props: any) => {
  return (
    <div>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

function Modal(props: ModalProps) {
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalElement(document.getElementById("overlays-root"));
  }, []);
  if (!portalElement) return null;
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
}
export default Modal;
