
const {

    createApp, ref, onMounted, onUnmounted, computed
} = Vue;
const SliderComponent = {
    template: `
                    <section id="parceria">
                        <div class="slider" @mouseenter="pauseSlider" @mouseleave="resumeSlider" ref="slider">
                            <div class="slide-track" ref="slideTrack" :style="trackStyle">
                            <div v-for="(item, index) in duplicatedItems" :key="index" class="slide-item">
                                <div class="parceria__wrapper">
                            <div class="cliente">
                                <img src="https://acountech.com.br/_nuxt/depoimento-bruno.zs67MFDs.png">
                                <div class="nome__cargo">
                                    <div class="nome">Bruno Lopes</div>
                                    <div class="cargo">cliente</div>
                                </div>
                            </div>
                            <div class="depoimento">
                                Equipe incrível. Já tive algumas experiências com outras contabilidades e posso dizer,
                                Acountech presta um serviço de excelência, muita qualidade, competência e de prontidão. Toda
                                dúvida ou questão que precisamos de ajuda, rapidamente resolvem, estão sempre a nossa
                                disposição com a solução. Parabéns pelo incrível serviço que prestam, por todo
                                comprometimento e atenção aos detalhes. Sucesso!
                            </div>
                        </div>
                            </div>
                            </div>
                        </div>
                    </section>
                    `,
    setup() {
        const slider = ref(null);
        const slideTrack = ref(null);
        const speed = 60; // px por segundo
        const slideWidth = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--slide-width'));
        const items = [
            {

                text: 'Item 1', color: '#3498db'
            },
            {

                text: 'Item 2', color: '#e74c3c'
            },
            {

                text: 'Item 3', color: '#2ecc71'
            },
            {

                text: 'Item 4', color: '#f39c12'
            },
            {

                text: 'Item 5', color: '#9b59b6'
            },
            {

                text: 'Item 6', color: '#1abc9c'
            },
        ];
        const duplicatedItems = [...items, ...items];
        const position = ref(0);
        const isPaused = ref(false);
        let lastTimestamp = null;
        let animationId = null;
        const trackStyle = computed(() => ({
            transform: `translateX(${position.value
                }px)`
        }));
        function step(timestamp) {
            if (!lastTimestamp) lastTimestamp = timestamp;
            const delta = timestamp - lastTimestamp;
            lastTimestamp = timestamp;
            if (!isPaused.value) {
                position.value -= (speed * delta) / 1000;
                if (position.value <= -slideWidth * items.length) {
                    position.value = 0;
                }
            }
            animationId = requestAnimationFrame(step);
        }
        function pauseSlider() {
            isPaused.value = true;
        }
        function resumeSlider() {
            isPaused.value = false;
            if (!animationId) {
                animationId = requestAnimationFrame(step);
            }
        }
        onMounted(() => {
            animationId = requestAnimationFrame(step);
        });
        onUnmounted(() => {
            if (animationId) cancelAnimationFrame(animationId);
        });
        return {
            duplicatedItems,
            position,
            slider,
            slideTrack,
            pauseSlider,
            resumeSlider,
            trackStyle,
        };
    }
};
createApp({
    components: {
        SliderComponent
    }
}).mount('#app');
