import Layout from '../../layout/Layout'
import AboutImage from '../../assets/Me.png'
import Graident from '../../assets/Gradient.svg'

const About = () => {
  return (
    <Layout>
      <img
        src={Graident}
        className="absolute top-[10%] right-[9%] object-cover z-[-1] opacity-70 w-[500px] h-auto"
        alt="Gradient background"
      />
      <main className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-12 py-16">
        <div className="flex flex-col items-start justify-start gap-4 md:max-w-[50%]">
          <p className="text-sm uppercase font-semibold tracking-wider text-gray-300 ">
            About me
          </p>
          <h1 className="text-3xl md:text-6xl md:leading-[4.8rem] font-bold capitalize ">
            My career as a <span className="">web developer</span>
          </h1>
          <p className="text-gray-300 text-base leading-relaxed w-[90%]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
            assumenda, cupiditate aliquam unde provident sunt et ab expedita
          </p>
        </div>

        <img
          src={AboutImage}
          className="w-[250px] md:w-[350px] rounded-lg shadow-lg"
          alt="About me"
        />
      </main>
    </Layout>
  )
}

export default About
