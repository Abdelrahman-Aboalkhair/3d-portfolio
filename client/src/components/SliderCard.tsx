import Slider from 'react-slick'
import Illustration1 from '../assets/Ilustration1.svg'
import Illustration2 from '../assets/Illustration2.svg'

const SliderCard = () => {
  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
  }

  // Card data
  const cardData = [
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
    {
      title: '3D Developer',
      description: 'Create visually stunning and interactive 3D models.',
      image: Illustration1,
    },
  ]

  return (
    <div className="w-full max-w-md mx-auto transform rotate-[1deg]">
      <Slider {...settings}>
        {cardData.map((card, index) => (
          <div
            key={index}
            className="text-white flex items-center justify-center gap-4 bg-[#251043] rounded-lg py-8 px-4 border-t-4 border-[#693B93]"
          >
            <img
              className="object-cover w-[80px]"
              src={card.image}
              alt={`Illustration for ${card.title}`}
            />
            <div className="flex flex-col items-start justify-start gap-1">
              <h1 className="text-[14px] font-semibold">{card.title}</h1>
              <p className="text-[9px] leading-tight">{card.description}</p>
              <button className="btn-secondary mt-2 text-[12px] px-2 py-1">
                Projects
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default SliderCard
