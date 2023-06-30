import { Card, CardHeader, CardBody, Chip } from "@material-tailwind/react";

function StudentdDetail() {
  return (
    <Card className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md h-full w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="md:flex items-center justify-between gap-8 sm:block">
          <div className="flex justify-center">
            <img
              className="h-40 w-25 rounded-full text-center"
              src="https://res.cloudinary.com/lcu-feeding-backup/image/upload/v1686694447/utils/man_lzm3t8.png"
              alt="nature image"
            />
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
          <div className="flex justify-center flex-col">
            <p className="font-bold text-center text-gray-800">Lastname</p>
            <p className="font-medium text-sm text-center text-gray-600">
              Ndoh
            </p>
          </div>
          <div className="flex justify-center flex-col">
            <p className="font-bold text-center text-gray-800">Firstname</p>
            <p className="font-medium text-sm text-center text-gray-600">
              Joel
            </p>
          </div>
          <div className="flex justify-center flex-col">
            <p className="font-bold text-center text-gray-800">Middlename</p>
            <p className="font-medium text-sm text-center text-gray-600">
              Chibueze
            </p>
          </div>
          <div className="flex justify-center flex-col">
            <p className="font-bold text-center text-gray-800">Sex</p>
            <p className="font-medium text-sm text-center text-gray-600">
              Male
            </p>
          </div>
          <div className="flex justify-center flex-col">
            <p className="font-bold text-center text-gray-800">Mat. Num</p>
            <p className="font-medium text-sm text-center text-gray-600">
              LCU/UG/20/17109
            </p>
          </div>
          <div className="flex justify-center flex-col">
            <p className="font-bold text-center text-gray-800">Level</p>
            <p className="font-medium text-sm text-center text-gray-600">300</p>
          </div>
          <div className="flex justify-center flex-col">
            <p className="font-bold text-center text-gray-800">Department</p>
            <p className="font-medium text-sm text-center text-gray-600">
              Software Engineering
            </p>
          </div>
          <div className="flex justify-center flex-col">
            <p className="font-bold text-center text-gray-800">Faculty</p>
            <p className="font-medium text-sm text-center text-gray-600">
              Basic Medical Applied Science
            </p>
          </div>
        </div>
        <p className="text-2xl font-bold text-gray-800 mb-4 text-center border-b-2 border-gray-200">
          Payment
        </p>
        <div className="grid grid-cols-2 gap-4 mb-10 md:grid-cols-4">
          <div className="flex justify-center flex-col">
            <p className="font-bold text-center text-gray-800">Total Amount(₦)</p>
            <p className="font-medium text-sm text-center text-gray-600">
              Ndoh
            </p>
          </div>
          <div className="flex justify-center flex-col">
            <p className="font-bold text-center text-gray-800">Amount Paid(₦)</p>
            <p className="font-medium text-sm text-center text-gray-600">
              Joel
            </p>
          </div>
          <div className="flex justify-center flex-col">
            <p className="font-bold text-center text-gray-800">Percentage</p>
            <div className="flex justify-center">
              <Chip
                variant="ghost"
                size="md"
                value="100%"
                color="green"
                className="w-max"
              />
            </div>
          </div>
        </div>
        <p className="text-2xl font-bold text-gray-800 mb-4 text-center border-b-2 border-gray-200">
          Hostel & Room
        </p>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="flex justify-center flex-col">
            <p className="font-bold text-center text-gray-800">Hostel</p>
            <p className="font-medium text-sm text-center text-gray-600">
              Block U
            </p>
          </div>
          <div className="flex justify-center flex-col">
            <p className="font-bold text-center text-gray-800">Room</p>
            <p className="font-medium text-sm text-center text-gray-600">
              114
            </p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default StudentdDetail;
