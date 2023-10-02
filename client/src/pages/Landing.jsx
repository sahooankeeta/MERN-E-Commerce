import React from 'react'
import Carousel from "react-multi-carousel";
const carouselImages=[
  "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1826&q=80",
  "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
  "https://images.unsplash.com/photo-1457364887197-9150188c107b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
]
const tiles=[
  {
    "img":"https://images.unsplash.com/photo-1446941611757-91d2c3bd3d45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2002&q=80",
    "title":"The Moon is lemon-shaped",
    "content":`Despite its appearance in the night sky, our natural satellite is nowhere near round. In fact, the Moon is shaped like a lemon, with flattened poles and bulges on both the near and far side around its equator.

    This strange shape is thought to have been created during interactions with Earth soon after its formation.`
  },
  {
    "img":"https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    "title":"Neptune has only completed one orbit around the Sun since its discovery",
    "content":"Neptune takes a whopping 165 years to complete one full orbit around the Sun. Since it was discovered in 1846, Neptune only recently finished its first full post-discovery orbit in 2011."
  },
  {
    "img":"https://images.unsplash.com/photo-1614642264762-d0a3b8bf3700?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80",
    "title":"The Sun loses a billion kilos per second",
    "content":`Particles in the Sun’s upper atmosphere are so hot and energetic that they speed out into space as part of the solar wind.

    Our star sheds around 1.3 trillion trillion trillion particles every second. This equates to roughly one billion kilograms of matter per second, or one Earth every 185 million years.`
  },
  {
    "img":"https://images.unsplash.com/photo-1560364897-91578ff41817?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    "title":"Vast amounts of water have been found in space",
    "content":`Earth’s oceans may not be that unique. Three of Jupiter’s moons (Europa, Ganymede, and Callisto) and two of Saturn’s (Enceladus (pictured above) and Titan) are thought to have underwater seas.
    Europa’s ocean may contain over twice the volume of water found on Earth. However, the most water ever discovered surrounds a black hole some 12 billion lightyears away.
    
    This region contains vast amounts of water vapour, the equivalent of 140 trillion times the volume of water in Earth’s oceans.`
  },
  
]
const testimonials=[
  {
  title:"Speechless with how easy this was to integrate",
  content:`I recently got my hands on Flowbite Pro, and holy crap,
   I'm speechless with how easy this was to integrate within my application.
    Most templates are a pain, code is scattered, and near impossible to theme.
    <br/>Flowbite has code in one place and I'm not joking when I say it took me a matter of minutes to copy the code,
     customise it and integrate within a Laravel + Vue application.<br/>If you care for your time, I hands down would go with this.`,
  name:"Bonnie Green",
  position:"Developer at Open AI",
  img:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
},
  {
    title:"Speechless with how easy this was to integrate",
    content:`I recently got my hands on Flowbite Pro, and holy crap,
     I'm speechless with how easy this was to integrate within my application.
      Most templates are a pain, code is scattered, and near impossible to theme.
      <br/>Flowbite has code in one place and I'm not joking when I say it took me a matter of minutes to copy the code,
       customise it and integrate within a Laravel + Vue application.<br/>If you care for your time, I hands down would go with this.`,
    name:"Andy Green",
    position:"Developer at Open AI",
    img:"https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
  },
  {
    title:"Speechless with how easy this was to integrate",
    content:`I recently got my hands on Flowbite Pro, and holy crap,
     I'm speechless with how easy this was to integrate within my application.
      Most templates are a pain, code is scattered, and near impossible to theme.
      <br/>Flowbite has code in one place and I'm not joking when I say it took me a matter of minutes to copy the code,
       customise it and integrate within a Laravel + Vue application.<br/>If you care for your time, I hands down would go with this.`,
    name:"Susan Green",
    position:"Developer at Open AI",
    img:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
    {
      title:"Speechless with how easy this was to integrate",
      content:`I recently got my hands on Flowbite Pro, and holy crap,
       I'm speechless with how easy this was to integrate within my application.
        Most templates are a pain, code is scattered, and near impossible to theme.
        <br/>Flowbite has code in one place and I'm not joking when I say it took me a matter of minutes to copy the code,
         customise it and integrate within a Laravel + Vue application.<br/>If you care for your time, I hands down would go with this.`,
      name:"Damon Green",
      position:"Developer at Open AI",
      img:"https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80"
    }
]
const Landing = () => {
  return (
    <div>
      <Carousel 
      swipeable={true}
      draggable={true}
      showDots={true}
      infinite={true}
      autoPlay={true}
      responsive={
       {
        desktop:{
          breakpoint: { max: 3000, min: 0 },
          items:1,
        slidesToSlide:1
        }
       }
      }
      >
         {carouselImages.map(item=><div className='h-[85vh]'><img className='h-full w-full object-cover' src={item} alt=""/></div>)}
      </Carousel>
      <div className="flex flex-col gap-16 md:gap-[100px] my-16">
      {tiles.map((item,index)=>
      <div className={`flex flex-col md:flex-row  items-center ${index%2==0 && 'md:flex-row-reverse'} gap-2 md:gap-16 px-10 md:px-0 w-full md:w-2/3 mx-auto`}>
        <div className='h-[300px] w-full md:w-1/3 '><img className='h-full w-full rounded-lg object-cover' src={item.img} alt=""/></div>
        
        <div className='flex flex-col gap-3 flex-1'>
          <div className='text-md md:text-2xl font-semibold text-slate-800'>{item.title}</div>
          <div className='text-sm md:text-lg font-sm text-slate-600'>{item.content}</div>
        </div>
      </div>
      )}
      </div>
      <Carousel className='my-8'
       swipeable={true}
       draggable={true}
       showDots={true}
       infinite={true}
       autoPlay={true}
       responsive={
        {
          tablet: {
            breakpoint: { max: 3000, min: 550 },
            items: 2,
          },
          mobile: {
            breakpoint: { max: 550, min: 0 },
            items: 1,
          }
        }
       }>
        {testimonials.map((item,index)=>
      <figure class="flex flex-col mx-4 my-10 justify-center items-center p-8 text-center bg-gray-100 rounded-lg border-b border-gray-200 md:p-12 lg:border-r dark:bg-gray-800 dark:border-gray-700">
      <blockquote class="mx-auto mb-8 text-gray-500 dark:text-gray-400">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{item.title}</h3>
          {item.content.split("<br/>").map(i=><p className='my-4'>{i}</p>)}
      </blockquote>
      <figcaption class="flex justify-center items-center space-x-3">
          <img class="w-14 h-14 object-cover rounded-full" src={item.img} alt="profile picture"/>
          <div class="space-y-0.5 font-medium dark:text-white text-left">
              <div>{item.name}</div>
              <div class="text-sm font-light text-gray-500 dark:text-gray-400">{item.position}</div>
          </div>
      </figcaption>    
  </figure> 
          )}
      </Carousel>
    </div>
  )
}

export default Landing