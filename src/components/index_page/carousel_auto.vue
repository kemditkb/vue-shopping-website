<template>
    <div id="carouselAuto">
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner">
                <a href="#" class="carousel-item active">
                    <img class="d-block w-100" src="../../assets/IMG_4195.jpg" alt="First slide">
                    
                </a>
                <a href="#" class="carousel-item">
                    <img class="d-block w-100" src="../../assets/IMG_4195.jpg" alt="Second slide">
                </a>
                <a href="#" class="carousel-item">
                    <img class="d-block w-100" src="../../assets/IMG_4195.jpg" alt="Third slide">
                </a>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span class="carousel-prev-icon" aria-hidden="true">
                    <i class="fas fa-angle-left fa-3x"></i>
                </span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span class="carousel-next-icon" aria-hidden="true">
                    <i class="fas fa-angle-right fa-3x"></i>
                </span>
                <span class="sr-only">Next</span>
            </a>
            </div>
    </div>
</template>

<style lang="scss">
#carouselAuto{
    >#carouselExampleIndicators{
        >.carousel-inner{
            >.carousel-item{
                >img{
                    margin: auto;
                    width: 600px !important;
                    height: auto;
                }
            }
        }
        >a{
            >span{
                > i {
                    color: #000000;
                }
            }
        }
    }
}
</style>

