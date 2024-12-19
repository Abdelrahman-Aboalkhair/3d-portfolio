import Slider from 'react-slick'
import Illustration1 from '../assets/Ilustration1.svg'
import Illustration2 from '../assets/Illustration2.svg'

const SliderCard = () => {
  // Slider settings
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
  }

  // Card data
  const cardData = [
    {
      title: '3D Developer',
      description: 'Create visually stunning and interactive 3D models.',
      image: Illustration1,
    },
    {
      title: 'Mern Stack Developer',
      description: 'Build seamless and efficient web applications.',
      image: Illustration1,
    },
    {
      title: 'UI/UX Designer',
      description: 'Design modern and user-friendly interfaces.',
      image: Illustration2,
    },
  ]

  return (
    <div className="w-full max-w-md mx-auto transform ">
      <Slider {...settings}>
        {cardData.map((card, index) => (
          <>
            <div
              key={index}
              className="flex flex-col items-center justify-center gap-2 text-white"
            >
              <h1 className="text-[30px] font-semibold whitespace-nowrap">
                {card.title}
              </h1>
              <p className="text-[12px] leading-tight">{card.description}</p>
              <button
                className="px-8 rounded-sm border-2 border-primary hover:border-transparent
               transition-colors duration-200 hover:bg-primary py-[7px] text-[13px] mt-2 mx-auto"
              >
                Projects
              </button>
            </div>
          </>
        ))}
      </Slider>
    </div>
  )
}

export default SliderCard
