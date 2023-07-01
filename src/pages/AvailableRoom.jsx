import {
  Card,
  Select,
  Option,
  Typography,
  CardBody,
  Spinner,
  Button,
  CardFooter,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useLogoutMutation,
  useGetHostelsMutation,
  useGetAvailableRoomsMutation,
} from "../slices/usersApiSlice";
import { toast } from "react-toastify";
import { logout } from "../slices/authSlice";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const TABLE_HEAD = ["Hostel", "Room No", "Max Per Room", "No Students"];

const TABLE_ROWS = [
  {
    roomNum: "John Michael",
    maxPerRoom: "Manager",
    numOfStudents: "23/04/18",
  },
  {
    roomNum: "Alexa Liras",
    maxPerRoom: "Developer",
    numOfStudents: "23/04/18",
  },
  {
    roomNum: "Laurent Perrier",
    maxPerRoom: "Executive",
    numOfStudents: "19/09/17",
  },
  {
    roomNum: "Michael Levi",
    maxPerRoom: "Developer",
    numOfStudents: "24/12/08",
  },
  {
    roomNum: "Richard Gran",
    maxPerRoom: "Manager",
    numOfStudents: "04/10/21",
  },
];
function AvailableRoom() {
  const { twk } = useSelector((state) => state.auth);
  const [getHostels, { isLoading }] = useGetHostelsMutation();
  const [avalaibleRooms, { isLoading: Loading }] =
    useGetAvailableRoomsMutation();
  const [logoutApiCall] = useLogoutMutation();
  const [hostels, setHostels] = useState([]);
  const [selectedHostel, setSelectedHostel] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    async function getRes() {
      try {
        const res = await getHostels({ token: twk });
        if (res.error) {
          throw Error(res.error.data.message);
        }
        setHostels(res.data);
      } catch (error) {
        console.log(error);
        toast.error(error.message);
        await logoutApiCall().unwrap();
        dispatch(logout());
        navigate("/login");
      }
    }

    getRes();
  }, [dispatch, getHostels, logoutApiCall, navigate, twk]);

  const getAvalaibleRooms = async (e) => {
    setSelectedHostel(e);
    console.log(e);
  };  

  return (
    <>
      <Card className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md h-full w-full mx-auto max-w-7xl p-4 sm:px-6 lg:px-8">
        <p className="font-bold text-2xl text-gray-900 mb-2 text-center">
          Select a hostel
        </p>
        <div className="flex flex-col items-center">
          <div className="w-72">
            <Select
              label="Select Version"
              value={selectedHostel}
              onChange={(e) => {getAvalaibleRooms(e)}}
            >
              {isLoading ? (
                <div className="flex justify-center">
                  <Spinner />
                </div>
              ) : (
                hostels.map(({ name, _id }) => (
                  <Option key={_id} value={name} id={_id} className="bg-white">
                    {name}
                  </Option>
                ))
              )}
            </Select>
          </div>
        </div>
        <p className="font-bold text-1xl text-gray-800 my-4">Available Rooms</p>
        <CardBody className="overflow-scroll p-0">
          {isLoading ? (
            <div className="flex justify-center">
              <Spinner />
            </div>
          ) : (
            <table className=" w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS.map(
                  ({ roomNum, maxPerRoom, numOfStudents, _id }, index) => {
                    const isLast = index === TABLE_ROWS.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr
                        key={_id}
                        id={_id}
                        className="hover:bg-gray-100 cursor-pointer"
                      >
                        <td className={classes}>
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              Block U
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {roomNum}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {maxPerRoom}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {numOfStudents}
                          </Typography>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          )}
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4 sticky bottom-0 bg-white">
          <>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {"Page 0 of 0"}
            </Typography>
            <div className="flex gap-2">
              <Button variant="outlined" color="blue-gray" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outlined" color="blue-gray" size="sm" disabled>
                Next
              </Button>
            </div>
          </>
        </CardFooter>
      </Card>
    </>
  );
}

export default AvailableRoom;
