interface Product {
  id: number;
  name: string;
  price: number;
  group: string;
  image: string;
}
const dataProducts: Product[] = [
  {
    id: 1,
    name: "Narguile Triton",
    price: 450.0,
    group: "hookah",
    image:
      "https://galeradonarguile.com.br/media/catalog/product/cache/28b2aad050427587f488ae01203c2bb7/n/a/narguile_triton_viper_sv_sem_rosh_1.webp",
  },
  {
    id: 2,
    name: "Vazo Aladin",
    price: 50.0,
    group: "accessories",
    image:
      "https://galeradonarguile.com.br/media/catalog/product/cache/28b2aad050427587f488ae01203c2bb7/b/a/base_ht_azul_1.webp",
  },
  {
    id: 3,
    name: "Ziggy - Watermelon Bomb",
    price: 9.0,
    group: "essencias",
    image:
      "https://cdn.awsli.com.br/2500x2500/1798/1798617/produto/220193495/essencia_ziggy_m-yerym8u48x.jpg",
  },
  {
    id: 4,
    name: "Carvao coco pro 1kg",
    price: 36.0,
    group: "carvao",
    image:
      "https://images.tcdn.com.br/img/img_prod/1255916/90_carvao_narguile_dark_coco_fibra_de_coco_hexagonal_759_1_e0fd9749aedf1fccc0df172c8c045c1f.png",
  },
  {
    id: 5,
    name: "Seda Smoking",
    price: 5.0,
    group: "heads",
    image:
      "https://images.tcdn.com.br/img/img_prod/421417/seda_smoking_brown_pequeno_78mm_livro_avulso_50_folhas_1107_1_20201002171207.jpg",
  },
  {
    id: 6,
    name: "Vodka Absolute",
    price: 60.0,
    group: "bebidas",
    image:
      "https://images.tcdn.com.br/img/img_prod/774261/vodka_absolut_750ml_1560_1_c2b465e21a9ca147d2c0bf46db40b1fe.jpg",
  },
];

export default dataProducts;
