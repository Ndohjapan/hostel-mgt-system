import { Card, CardHeader, CardBody, Chip } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetStudentMutation,
  useLogoutMutation,
  useRemoveFromRoomMutation,
} from "../slices/usersApiSlice";
import { toast } from "react-toastify";
import { logout } from "../slices/authSlice";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../components/Modal";

function StudentdDetail() {
  const { twk } = useSelector((state) => state.auth);
  const { userId } = useParams();
  const [getStudent, { isLoading }] = useGetStudentMutation();
  const [removeStudent, {isLoading: loading}] = useRemoveFromRoomMutation();
  const [logoutApiCall] = useLogoutMutation();
  const [user, setUser] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  


  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    async function getRes() {
      try {
        const res = await getStudent({ userId, token: twk });
        if (res.error) {
          throw Error(res.error.data.message);
        }
        setUser(res.data);
      } catch (error) {
        console.log(error);
        toast.error(error.message);
        await logoutApiCall().unwrap();
        dispatch(logout());
        navigate("/login");
      }
    }

    getRes();
  }, [dispatch, getStudent, logoutApiCall, navigate, twk, userId, setUser]);

  const assignRoom = async(e) => {
    e.preventDefault
    navigate(`/room/available/${userId}`);
  }

  const toggleModal = () => {
    setIsOpen(prev => !prev);
  };

  const removeFromRoom = async() => {
    try {
      const res = await removeStudent({ page: 1, limit: 20, token: twk, userId });
      if(res.error){
        throw Error(res.error.data.message);
      }
      setUser(res.data);
    } catch (error) {
      toast.error(error.message);
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="md:h-screen flex items-center justify-center">
          <Card className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md h-full w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <CardHeader floated={false} shadow={false} className="rounded-none">
              <div className="md:flex items-center justify-between gap-8 sm:block">
                <div className="flex justify-center">
                  <div className="h-40 w-40 rounded-full bg-gray-300 animate-pulse"></div>
                </div>
                <div className="w-full md:w-72 mt-6 md:mt-0 flex justify-center">
                  <button className="text-white rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Assign
                  </button>
                  <button className="text-white rounded-md bg-red-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Remove
                  </button>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <p className="text-2xl font-bold text-gray-800 mb-4 text-center border-b-2 border-gray-200">
                General Profile
              </p>
              <div className="grid grid-cols-2 gap-4 mb-10 md:grid-cols-4">
                <div className="flex justify-center items-center flex-col">
                  <p className="font-bold text-center text-gray-800">
                    Lastname
                  </p>
                  <div className="h-5 w-1/2 bg-gray-300 rounded animate-pulse"></div>
                </div>
                <div className="flex justify-center items-center flex-col">
                  <p className="font-bold text-center text-gray-800">
                    Firstname
                  </p>
                  <div className="h-5 w-1/2 bg-gray-300 rounded animate-pulse"></div>
                </div>
                <div className="flex justify-center items-center flex-col">
                  <p className="font-bold text-center text-gray-800">
                    Middlename
                  </p>
                  <div className="h-5 w-1/2 bg-gray-300 rounded animate-pulse"></div>
                </div>
                <div className="flex justify-center items-center flex-col">
                  <p className="font-bold text-center text-gray-800">Sex</p>
                  <div className="h-5 w-1/2 bg-gray-300 rounded animate-pulse"></div>
                </div>
                <div className="flex justify-center items-center flex-col">
                  <p className="font-bold text-center text-gray-800">
                    Mat. Num
                  </p>
                  <div className="h-5 w-1/2 bg-gray-300 rounded animate-pulse"></div>
                </div>
                <div className="flex justify-center items-center flex-col">
                  <p className="font-bold text-center text-gray-800">Level</p>
                  <div className="h-5 w-1/2 bg-gray-300 rounded animate-pulse"></div>
                </div>
                <div className="flex justify-center items-center flex-col">
                  <p className="font-bold text-center text-gray-800">
                    Department
                  </p>
                  <div className="h-5 w-1/2 bg-gray-300 rounded animate-pulse"></div>
                </div>
                <div className="flex justify-center items-center flex-col">
                  <p className="font-bold text-center text-gray-800">Faculty</p>
                  <div className="h-5 w-1/2 bg-gray-300 rounded animate-pulse"></div>
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-800 mb-4 text-center border-b-2 border-gray-200">
                Payment
              </p>
              <div className="grid grid-cols-2 gap-4 mb-10 md:grid-cols-4">
                <div className="flex justify-center items-center flex-col">
                  <p className="font-bold text-center text-gray-800">
                    Total Amount(₦)
                  </p>
                  <div className="h-5 w-1/2 bg-gray-300 rounded animate-pulse"></div>
                </div>
                <div className="flex justify-center items-center flex-col">
                  <p className="font-bold text-center text-gray-800">
                    Amount Paid(₦)
                  </p>
                  <div className="h-5 w-1/2 bg-gray-300 rounded animate-pulse"></div>
                </div>
                <div className="flex justify-center items-center flex-col">
                  <p className="font-bold text-center text-gray-800">
                    Percentage
                  </p>
                  <div className="h-5 w-1/2 bg-gray-300 rounded animate-pulse"></div>
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-800 mb-4 text-center border-b-2 border-gray-200">
                Hostel & Room
              </p>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="flex justify-center items-center flex-col">
                  <p className="font-bold text-center text-gray-800">Hostel</p>
                  <div className="h-5 w-1/2 bg-gray-300 rounded animate-pulse"></div>
                </div>
                <div className="flex justify-center items-center flex-col">
                  <p className="font-bold text-center text-gray-800">Room</p>
                  <div className="h-5 w-1/2 bg-gray-300 rounded animate-pulse"></div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      ) : (
        <div className="md:h-screen flex items-center justify-center">
          <Card className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <CardHeader floated={false} shadow={false} className="rounded-none">
              <div className="md:flex items-center justify-between gap-8 sm:block">
                <div className="flex justify-center">
                  <img
                    className="h-40 w-25 rounded-full text-center"
                    src={user.avatar}
                    alt="nature image"
                  />
                </div>
                <div className="w-full md:w-72 mt-6 md:mt-0 flex justify-center">
                  {user.room ? (
                    <><button className="text-white rounded-md bg-red-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={toggleModal}>
                        Remove
                      </button><Modal isOpen={isOpen} toggleModal={toggleModal} user={user} removeFromRoom={removeFromRoom} loading={loading}/></>
                  ) : (
                    <button className="text-white rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={assignRoom}>
                      Assign
                    </button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <p className="text-2xl font-bold text-gray-800 mb-4 text-center border-b-2 border-gray-200">
                General Profile
              </p>
              <div className="grid grid-cols-2 gap-4 mb-10 md:grid-cols-4">
                <div className="flex justify-center flex-col">
                  <p className="font-bold text-center text-gray-800">
                    Lastname
                  </p>
                  <p className="font-medium text-sm text-center text-gray-600">
                    {user.lastname}
                  </p>
                </div>
                <div className="flex justify-center flex-col">
                  <p className="font-bold text-center text-gray-800">
                    Firstname
                  </p>
                  <p className="font-medium text-sm text-center text-gray-600">
                    {user.firstname}
                  </p>
                </div>
                <div className="flex justify-center flex-col">
                  <p className="font-bold text-center text-gray-800">
                    Middlename
                  </p>
                  <p className="font-medium text-sm text-center text-gray-600">
                    {user.middlename}
                  </p>
                </div>
                <div className="flex justify-center flex-col">
                  <p className="font-bold text-center text-gray-800">Sex</p>
                  <p className="font-medium text-sm text-center text-gray-600">
                    Male
                  </p>
                </div>
                <div className="flex justify-center flex-col">
                  <p className="font-bold text-center text-gray-800">
                    Mat. Num
                  </p>
                  <p className="font-medium text-sm text-center text-gray-600">
                    {user.matricNumber}
                  </p>
                </div>
                <div className="flex justify-center flex-col">
                  <p className="font-bold text-center text-gray-800">Level</p>
                  <p className="font-medium text-sm text-center text-gray-600">
                    {user.level}
                  </p>
                </div>
                <div className="flex justify-center flex-col">
                  <p className="font-bold text-center text-gray-800">
                    Department
                  </p>
                  <p className="font-medium text-sm text-center text-gray-600">
                    {user.department}
                  </p>
                </div>
                <div className="flex justify-center flex-col">
                  <p className="font-bold text-center text-gray-800">Faculty</p>
                  <p className="font-medium text-sm text-center text-gray-600">
                    {user.faculty}
                  </p>
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-800 mb-4 text-center border-b-2 border-gray-200">
                Payment
              </p>
              <div className="grid grid-cols-2 gap-4 mb-10 md:grid-cols-4">
                <div className="flex justify-center flex-col">
                  <p className="font-bold text-center text-gray-800">
                    Total Amount(₦)
                  </p>
                  <p className="font-medium text-sm text-center text-gray-600">
                    {user.totalAmount}
                  </p>
                </div>
                <div className="flex justify-center flex-col">
                  <p className="font-bold text-center text-gray-800">
                    Amount Paid(₦)
                  </p>
                  <p className="font-medium text-sm text-center text-gray-600">
                    {user.amountPaid}
                  </p>
                </div>
                <div className="flex justify-center flex-col">
                  <p className="font-bold text-center text-gray-800">
                    Percentage
                  </p>
                  <div className="flex justify-center">
                    <Chip
                      variant="ghost"
                      size="md"
                      value={user.percentage + "%"}
                      color={
                        user.percentage < 50
                          ? "red"
                          : user.percentage < 100
                          ? "yellow"
                          : "green"
                      }
                      className="w-max"
                    />
                  </div>
                </div>
              </div>
              {user.room ? (
                <>
                  <p className="text-2xl font-bold text-gray-800 mb-4 text-center border-b-2 border-gray-200">
                    Hostel & Room
                  </p>
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    <div className="flex justify-center flex-col">
                      <p className="font-bold text-center text-gray-800">
                        Hostel
                      </p>
                      <p className="font-medium text-sm text-center text-gray-600">
                        {user.room.hostel.name}
                      </p>
                    </div>
                    <div className="flex justify-center flex-col">
                      <p className="font-bold text-center text-gray-800">
                        Room
                      </p>
                      <p className="font-medium text-sm text-center text-gray-600">
                        {user.room.roomNum}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}
            </CardBody>
          </Card>
        </div>
      )}
    </>
  );
}

export default StudentdDetail;
