import { useState } from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

function AddCabin() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpenModal((curr) => !curr)}>
        Add new cabin
      </Button>
      {isOpenModal && (
        <Modal>
          <CreateCabinForm />
        </Modal>
      )}
    </>
  );
}

export default AddCabin;
