<template>
    <div>
        <Header></Header>
        <CarouselAuto></CarouselAuto>
        <Slogan></Slogan>
        <Carouselmanual></Carouselmanual>
        <Footer></Footer>
    </div>
</template>


<script>
import Header from './header'
import Footer from './footer'
import CarouselAuto from './carousel_auto'
import Slogan from './slogan'
import Carouselmanual from './carousel_manual'


export default {
    components:{
        Header,
        Footer,
        CarouselAuto,
        Slogan,
        Carouselmanual
    }
}
</script>

