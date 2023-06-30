import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  Spinner,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useGetStudentsMutation, useLogoutMutation } from "../slices/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../slices/authSlice";
import "react-toastify/dist/ReactToastify.css";

const TABLE_HEAD = [
  "Student",
  "Amount(₦)",
  "Amount(%)",
  "Hostel",
  "Room",
  "Department",
  "Level",
];

export default function StudentHeader() {
  const [getStudents, { isLoading }] = useGetStudentsMutation();
  const [logoutApiCall] = useLogoutMutation();
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState([]);

  const { twk } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    async function getRes() {

      try {
        const res = await getStudents({ page: 1, limit: 20, token: twk });
        if(res.error){
          throw Error(res.error.data.message);
        }
        setUsers(res.data.docs);
        setPagination(res);
      } catch (error) {
        toast.error(error.message);
        await logoutApiCall().unwrap();
        dispatch(logout());
        navigate("/login");
      }
    }

    getRes();
  }, [dispatch, getStudents, logoutApiCall, navigate, twk]);

  const userDetails = async (e) => {
    e.preventDefault();
    const userId = e.currentTarget.id;
    navigate(`/user/${userId}`);
  };

  return (
    <Card className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md h-full w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="md:flex items-center justify-between gap-8 sm:block">
          <div>
            <Typography variant="h5" color="blue-gray">
              Hostelites
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all hostelites
            </Typography>
          </div>
          <div className="w-full md:w-72 mt-6 md:mt-0">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        {isLoading ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : (
          <table className="mt-4 w-full min-w-max table-auto text-left">
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
              {users.map(
                (
                  {
                    avatar,
                    firstname,
                    middlename,
                    lastname,
                    amountPaid,
                    percentage,
                    room,
                    department,
                    level,
                    _id,
                  },
                  index
                ) => {
                  const isLast = index === users.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={_id} onClick={userDetails} id={_id} className="hover:bg-gray-100 cursor-pointer">
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={avatar}
                            alt={lastname + " " + firstname + " " + middlename}
                            size="sm"
                          />
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {lastname + " " + firstname + " " + middlename}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {amountPaid}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Chip
                            variant="ghost"
                            size="sm"
                            value={percentage + "%"}
                            color={
                              percentage < 50
                                ? "red"
                                : percentage < 100
                                ? "yellow"
                                : "green"
                            }
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {room ? room.hostel.name : "----"}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {room ? room.roomNum : "----"}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {department}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {level}
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
        {isLoading === true ? (
          <>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {"Page 0 of 0"}
            </Typography>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {"0 of 0 Student"}
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
        ) : (
          <>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {"Page " +
                pagination.data?.page +
                " of " +
                pagination.data?.totalPages}
            </Typography>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {users.length + " of " + pagination.data?.totalDocs + " Students"}
            </Typography>
            <div className="flex gap-2">
              {pagination.data?.prevPage === null ? (
                <Button variant="outlined" color="blue-gray" size="sm" disabled>
                  Previous
                </Button>
              ) : (
                <Button variant="outlined" color="blue-gray" size="sm">
                  Previous
                </Button>
              )}
              {pagination.data?.nextPage === null ? (
                <Button variant="outlined" color="blue-gray" size="sm" disabled>
                  Next
                </Button>
              ) : (
                <Button variant="outlined" color="blue-gray" size="sm">
                  Next
                </Button>
              )}
            </div>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
