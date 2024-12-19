import { ThreeDots } from 'react-loader-spinner'

const Loader = () => {
  return (
    <div className="w-[100px] h-[100px] mx-auto mt-[13%]">
      <ThreeDots
        visible={true}
        color="#7127ba"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  )
}

export default Loader
