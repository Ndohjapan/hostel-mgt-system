import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Spinner,
} from "@material-tailwind/react";

// eslint-disable-next-line react/prop-types
export default function Modal({
  isOpen,
  toggleModal,
  user,
  removeFromRoom,
  loading,
}) {
  //   const [open, setOpen] = useState(false);

  const handleOpen = () => {
    toggleModal();
  };

  const remove = async () => {
    await removeFromRoom();
    toggleModal();
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
        Are you sure you want to remove{" "}
        {user.lastname + " " + user.firstname + " " + user.middlename} from{" "}
        {user.room.hostel.name} room {user.room.roomNum}
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
        {loading ? (
          <Button variant="gradient" color="green" onClick={remove}>
            <Spinner />
          </Button>
        ) : (
          <Button variant="gradient" color="green" onClick={remove}>
            <span>Confirm</span>
          </Button>
        )}
      </DialogFooter>
    </Dialog>
  );
}
