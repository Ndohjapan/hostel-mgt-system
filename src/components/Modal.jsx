import { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

// eslint-disable-next-line react/prop-types
export default function Modal({ isOpen, toggleModal, user }) {
  //   const [open, setOpen] = useState(false);

  const handleOpen = () => {
    toggleModal()
  };

  return (
    <Dialog
      open={isOpen}
      handler={handleOpen}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
    >
      <DialogHeader>Confirm Action</DialogHeader>
      <DialogBody divider>
        Are you sure you want to remove {user.lastname + " " + user.firstname + " "+ user.middlename} from {user.room.hostel.name} room {user.room.roomNum}
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={handleOpen}
          className="mr-1"
        >
          <span>Cancel</span>
        </Button>
        <Button variant="gradient" color="green" onClick={handleOpen}>
          <span>Confirm</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
