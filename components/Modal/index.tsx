import { FC, ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import ModalWrapper from '@/components/Modal/Modal';

interface IModalsProps {
  title?: string;
  openModal: boolean;
  closeModal: () => void;
  content: ReactNode;
  widths?: string;
}

const Modal: FC<IModalsProps> = ({
  openModal,
  title,
  closeModal,
  content,
  widths
}: IModalsProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  return mounted
    ? createPortal(
        <ModalWrapper
          openModal={openModal}
          title={title}
          closeModal={closeModal}
          content={content}
          widths={widths}
        />,
        document.querySelector('#mymodal')
      )
    : null;
};

export default Modal;
