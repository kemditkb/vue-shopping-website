<template>
    <div>
        <Header></Header>
        <CarouselAuto></CarouselAuto>
        <AD></AD>
        <Carouselmanual></Carouselmanual>
        <AdDisconut></AdDisconut>
        <Slogan></Slogan>
        <Footer></Footer>
    </div>
</template>
<!-- 利用component 將畫面組裝 -->

<script>
import Header from './header'
import Footer from './footer'
import CarouselAuto from './carousel_auto'
import Slogan from './slogan'
import Carouselmanual from './carousel_manual'
import AD from './ad'
import AdDisconut from './ad_discount'


export default {
    components:{
        Header,
        Footer,
        CarouselAuto,
        Slogan,
        Carouselmanual,
        AD,
        AdDisconut
    }
}
</script>

