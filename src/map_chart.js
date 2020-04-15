//draw map_chart with monthly data in
//draw cities with long lat infos from csv file
export function mapChart(data) {
    //fix missing data of 'Northwest Territories" 
    data.push({ REF_DATE: data[0].REF_DATE, GEO: "Northwest Territories", VALUE: "0" }); 
     // sort CSV data accordng to json province order
    const dataSorted = [data[1], data[2], data[10], data[11], data[7], data[9], data[4], data[0], data[5], data[12], data[3], data[8], data[6]];
 
    const margin = { top: 50, left: 50, right: 50, bottom: 50},
        height = 520 - margin.top - margin.bottom,
        width = 750 - margin.left - margin.right;

    const canvas2 = d3.select('.mapWrap')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate('+ margin.left + "," + margin.top + ")");

    const yScale = d3.scaleThreshold()
        .domain([140000, 0])
        .range([0, 500]);


    const yAxis = d3.axisRight()
        .scale(yScale);
   
    // const colorScale = d3.scaleSqrt()
    //     .domain([0, 1400000])
    //     .range(d3.schemePastel2);
    const colorScale = d3.scaleThreshold()
        .domain([0, 500, 5000, 10000, 50000, 100000, 300000, 700000, 1000000, 1300000, 1700000])
        .range(["#f7fcf5", "#ebf7e7", "#ddf2d7", "#caeac3", "#b3e1ad", "#9ad696", "#7ec980", "#60ba6d", "#44a95d", "#2e964d", "#19833e"]);

    const ar = ["#f7fcf5", "#f6fcf4", "#f6fcf4", "#f5fbf3", "#f5fbf2", "#f4fbf2", "#f4fbf1", "#f3faf0", "#f2faf0", "#f2faef", "#f1faee", "#f1faee", "#f0f9ed", "#f0f9ec", "#eff9ec", "#eef9eb", "#eef8ea", "#edf8ea", "#ecf8e9", "#ecf8e8", "#ebf7e7", "#ebf7e7", "#eaf7e6", "#e9f7e5", "#e9f6e4", "#e8f6e4", "#e7f6e3", "#e7f6e2", "#e6f5e1", "#e5f5e1", "#e4f5e0", "#e4f4df", "#e3f4de", "#e2f4dd", "#e1f4dc", "#e1f3dc", "#e0f3db", "#dff3da", "#def2d9", "#ddf2d8", "#ddf2d7", "#dcf1d6", "#dbf1d5", "#daf1d4", "#d9f0d3", "#d8f0d2", "#d7efd1", "#d6efd0", "#d5efcf", "#d4eece", "#d4eece", "#d3eecd", "#d2edcb", "#d1edca", "#d0ecc9", "#cfecc8", "#ceecc7", "#cdebc6", "#ccebc5", "#cbeac4", "#caeac3", "#c9eac2", "#c8e9c1", "#c6e9c0", "#c5e8bf", "#c4e8be", "#c3e7bd", "#c2e7bc", "#c1e6bb", "#c0e6b9", "#bfe6b8", "#bee5b7", "#bde5b6", "#bbe4b5", "#bae4b4", "#b9e3b3", "#b8e3b2", "#b7e2b0", "#b6e2af", "#b5e1ae", "#b3e1ad", "#b2e0ac", "#b1e0ab", "#b0dfaa", "#aedfa8", "#addea7", "#acdea6", "#abdda5", "#aadca4", "#a8dca3", "#a7dba2", "#a6dba0", "#a5da9f", "#a3da9e", "#a2d99d", "#a1d99c", "#9fd89b", "#9ed799", "#9dd798", "#9bd697", "#9ad696", "#99d595", "#97d494", "#96d492", "#95d391", "#93d390", "#92d28f", "#91d18e", "#8fd18d", "#8ed08c", "#8ccf8a", "#8bcf89", "#8ace88", "#88cd87", "#87cd86", "#85cc85", "#84cb84", "#82cb83", "#81ca82", "#80c981", "#7ec980", "#7dc87f", "#7bc77e", "#7ac77c", "#78c67b", "#77c57a", "#75c479", "#74c478", "#72c378", "#71c277", "#6fc276", "#6ec175", "#6cc074", "#6bbf73", "#69bf72", "#68be71", "#66bd70", "#65bc6f", "#63bc6e", "#62bb6e", "#60ba6d", "#5eb96c", "#5db86b", "#5bb86a", "#5ab769", "#58b668", "#57b568", "#56b467", "#54b466", "#53b365", "#51b264", "#50b164", "#4eb063", "#4daf62", "#4caf61", "#4aae61", "#49ad60", "#48ac5f", "#46ab5e", "#45aa5d", "#44a95d", "#42a85c", "#41a75b", "#40a75a", "#3fa65a", "#3ea559", "#3ca458", "#3ba357", "#3aa257", "#39a156", "#38a055", "#379f54", "#369e54", "#359d53", "#349c52", "#339b51", "#329a50", "#319950", "#30984f", "#2f974e", "#2e964d", "#2d954d", "#2b944c", "#2a934b", "#29924a", "#28914a", "#279049", "#268f48", "#258f47", "#248e47", "#238d46", "#228c45", "#218b44", "#208a43", "#1f8943", "#1e8842", "#1d8741", "#1c8640", "#1b8540", "#1a843f", "#19833e", "#18823d", "#17813d", "#16803c", "#157f3b", "#147e3a", "#137d3a", "#127c39", "#117b38", "#107a37", "#107937", "#0f7836", "#0e7735", "#0d7634", "#0c7534", "#0b7433", "#0b7332", "#0a7232", "#097131", "#087030", "#086f2f", "#076e2f", "#066c2e", "#066b2d", "#056a2d", "#05692c", "#04682b", "#04672b", "#04662a", "#03642a", "#036329", "#026228", "#026128", "#026027", "#025e27", "#015d26", "#015c25", "#015b25", "#015a24", "#015824", "#015723", "#005623", "#005522", "#005321", "#005221", "#005120", "#005020", "#004e1f", "#004d1f", "#004c1e", "#004a1e", "#00491d", "#00481d", "#00471c", "#00451c", "#00441b"];
    const arr = ["#ffffe5", "#ffffe4", "#feffe2", "#feffe1", "#feffdf", "#feffde", "#fdfedd", "#fdfedb", "#fdfeda", "#fdfed9", "#fcfed7", "#fcfed6", "#fcfed5", "#fbfed3", "#fbfed2", "#fbfdd1", "#fbfdcf", "#fafdce", "#fafdcd", "#f9fdcc", "#f9fdca", "#f9fdc9", "#f8fcc8", "#f8fcc7", "#f7fcc5", "#f7fcc4", "#f6fcc3", "#f6fcc2", "#f5fbc1", "#f5fbc0", "#f4fbbf", "#f4fbbe", "#f3fabd", "#f3fabc", "#f2fabb", "#f1faba", "#f1f9b9", "#f0f9b8", "#eff9b7", "#eff9b6", "#eef8b5", "#edf8b4", "#ecf8b3", "#ebf7b2", "#ebf7b2", "#eaf7b1", "#e9f6b0", "#e8f6af", "#e7f6ae", "#e6f5ae", "#e5f5ad", "#e4f4ac", "#e3f4ab", "#e2f4ab", "#e1f3aa", "#e0f3a9", "#dff2a8", "#def2a8", "#ddf2a7", "#dcf1a6", "#dbf1a6", "#daf0a5", "#d9f0a4", "#d8efa4", "#d6efa3", "#d5eea2", "#d4eea2", "#d3eda1", "#d2eda0", "#d0eca0", "#cfec9f", "#ceeb9e", "#cdeb9e", "#cbea9d", "#caea9c", "#c9e99c", "#c7e89b", "#c6e89a", "#c5e79a", "#c3e799", "#c2e698", "#c1e598", "#bfe597", "#bee496", "#bde496", "#bbe395", "#bae294", "#b8e294", "#b7e193", "#b5e192", "#b4e092", "#b2df91", "#b1df90", "#afde90", "#aedd8f", "#acdd8e", "#abdc8e", "#a9db8d", "#a8db8c", "#a6da8c", "#a5d98b", "#a3d98a", "#a2d88a", "#a0d789", "#9ed788", "#9dd688", "#9bd587", "#9ad586", "#98d486", "#96d385", "#95d284", "#93d284", "#92d183", "#90d082", "#8ed082", "#8dcf81", "#8bce80", "#89cd80", "#88cd7f", "#86cc7e", "#84cb7d", "#83ca7d", "#81ca7c", "#7fc97b", "#7ec87a", "#7cc77a", "#7ac779", "#79c678", "#77c577", "#75c477", "#73c376", "#72c375", "#70c274", "#6ec174", "#6dc073", "#6bbf72", "#69be71", "#68be70", "#66bd6f", "#64bc6f", "#63bb6e", "#61ba6d", "#5fb96c", "#5eb96b", "#5cb86a", "#5ab76a", "#59b669", "#57b568", "#56b467", "#54b366", "#53b265", "#51b164", "#50b064", "#4eaf63", "#4dae62", "#4bad61", "#4aac60", "#48ab5f", "#47aa5e", "#46a95e", "#44a85d", "#43a75c", "#42a65b", "#40a55a", "#3fa459", "#3ea359", "#3da258", "#3ca157", "#3aa056", "#399f55", "#389d55", "#379c54", "#369b53", "#359a52", "#349951", "#339851", "#329750", "#31964f", "#30944e", "#2f934e", "#2e924d", "#2d914c", "#2c904b", "#2a8f4b", "#298e4a", "#288d49", "#278b49", "#268a48", "#258947", "#248847", "#238746", "#228645", "#218545", "#208444", "#1f8344", "#1e8243", "#1d8143", "#1c8042", "#1b7f42", "#1a7e41", "#197d41", "#187c40", "#177b40", "#167a3f", "#15793f", "#14783e", "#13773e", "#12763d", "#11753d", "#10743c", "#10733c", "#0f723c", "#0e723b", "#0d713b", "#0c703a", "#0b6f3a", "#0b6e3a", "#0a6d39", "#096c39", "#086b38", "#086a38", "#076938", "#066837", "#066737", "#056636", "#056536", "#046435", "#046335", "#046235", "#036134", "#036034", "#025f33", "#025e33", "#025d33", "#025c32", "#015b32", "#015a31", "#015931", "#015730", "#015630", "#015530", "#00542f", "#00532f", "#00522e", "#00512e", "#00502d", "#004f2d", "#004e2d", "#004d2c", "#004c2c", "#004a2b", "#00492b", "#00482a", "#00472a", "#004629", "#004529"]
    const arr1 = ["#f7fbff", "#f6faff", "#f5fafe", "#f5f9fe", "#f4f9fe", "#f3f8fe", "#f2f8fd", "#f2f7fd", "#f1f7fd", "#f0f6fd", "#eff6fc", "#eef5fc", "#eef5fc", "#edf4fc", "#ecf4fb", "#ebf3fb", "#eaf3fb", "#eaf2fb", "#e9f2fa", "#e8f1fa", "#e7f1fa", "#e7f0fa", "#e6f0f9", "#e5eff9", "#e4eff9", "#e3eef9", "#e3eef8", "#e2edf8", "#e1edf8", "#e0ecf8", "#e0ecf7", "#dfebf7", "#deebf7", "#ddeaf7", "#ddeaf6", "#dce9f6", "#dbe9f6", "#dae8f6", "#d9e8f5", "#d9e7f5", "#d8e7f5", "#d7e6f5", "#d6e6f4", "#d6e5f4", "#d5e5f4", "#d4e4f4", "#d3e4f3", "#d2e3f3", "#d2e3f3", "#d1e2f3", "#d0e2f2", "#cfe1f2", "#cee1f2", "#cde0f1", "#cce0f1", "#ccdff1", "#cbdff1", "#cadef0", "#c9def0", "#c8ddf0", "#c7ddef", "#c6dcef", "#c5dcef", "#c4dbee", "#c3dbee", "#c2daee", "#c1daed", "#c0d9ed", "#bfd9ec", "#bed8ec", "#bdd8ec", "#bcd7eb", "#bbd7eb", "#b9d6eb", "#b8d5ea", "#b7d5ea", "#b6d4e9", "#b5d4e9", "#b4d3e9", "#b2d3e8", "#b1d2e8", "#b0d1e7", "#afd1e7", "#add0e7", "#acd0e6", "#abcfe6", "#a9cfe5", "#a8cee5", "#a7cde5", "#a5cde4", "#a4cce4", "#a3cbe3", "#a1cbe3", "#a0cae3", "#9ec9e2", "#9dc9e2", "#9cc8e1", "#9ac7e1", "#99c6e1", "#97c6e0", "#96c5e0", "#94c4df", "#93c3df", "#91c3df", "#90c2de", "#8ec1de", "#8dc0de", "#8bc0dd", "#8abfdd", "#88bedc", "#87bddc", "#85bcdc", "#84bbdb", "#82bbdb", "#81badb", "#7fb9da", "#7eb8da", "#7cb7d9", "#7bb6d9", "#79b5d9", "#78b5d8", "#76b4d8", "#75b3d7", "#73b2d7", "#72b1d7", "#70b0d6", "#6fafd6", "#6daed5", "#6caed5", "#6badd5", "#69acd4", "#68abd4", "#66aad3", "#65a9d3", "#63a8d2", "#62a7d2", "#61a7d1", "#5fa6d1", "#5ea5d0", "#5da4d0", "#5ba3d0", "#5aa2cf", "#59a1cf", "#57a0ce", "#569fce", "#559ecd", "#549ecd", "#529dcc", "#519ccc", "#509bcb", "#4f9acb", "#4d99ca", "#4c98ca", "#4b97c9", "#4a96c9", "#4895c8", "#4794c8", "#4693c7", "#4592c7", "#4492c6", "#4391c6", "#4190c5", "#408fc4", "#3f8ec4", "#3e8dc3", "#3d8cc3", "#3c8bc2", "#3b8ac2", "#3a89c1", "#3988c1", "#3787c0", "#3686c0", "#3585bf", "#3484bf", "#3383be", "#3282bd", "#3181bd", "#3080bc", "#2f7fbc", "#2e7ebb", "#2d7dbb", "#2c7cba", "#2b7bb9", "#2a7ab9", "#2979b8", "#2878b8", "#2777b7", "#2676b6", "#2574b6", "#2473b5", "#2372b4", "#2371b4", "#2270b3", "#216fb3", "#206eb2", "#1f6db1", "#1e6cb0", "#1d6bb0", "#1c6aaf", "#1c69ae", "#1b68ae", "#1a67ad", "#1966ac", "#1865ab", "#1864aa", "#1763aa", "#1662a9", "#1561a8", "#1560a7", "#145fa6", "#135ea5", "#135da4", "#125ca4", "#115ba3", "#115aa2", "#1059a1", "#1058a0", "#0f579f", "#0e569e", "#0e559d", "#0e549c", "#0d539a", "#0d5299", "#0c5198", "#0c5097", "#0b4f96", "#0b4e95", "#0b4d93", "#0b4c92", "#0a4b91", "#0a4a90", "#0a498e", "#0a488d", "#09478c", "#09468a", "#094589", "#094487", "#094386", "#094285", "#094183", "#084082", "#083e80", "#083d7f", "#083c7d", "#083b7c", "#083a7a", "#083979", "#083877", "#083776", "#083674", "#083573", "#083471", "#083370", "#08326e", "#08316d", "#08306b"];
    const arr2 = ["#f7fcf0", "#f6fcef", "#f6fbef", "#f5fbee", "#f4fbed", "#f3fbed", "#f3faec", "#f2faeb", "#f1faeb", "#f1f9ea", "#f0f9e9", "#eff9e9", "#eef9e8", "#eef8e7", "#edf8e7", "#ecf8e6", "#ecf8e5", "#ebf7e5", "#eaf7e4", "#e9f7e3", "#e9f6e3", "#e8f6e2", "#e7f6e1", "#e7f6e1", "#e6f5e0", "#e5f5df", "#e5f5df", "#e4f4de", "#e3f4dd", "#e2f4dd", "#e2f4dc", "#e1f3db", "#e0f3db", "#e0f3da", "#dff3d9", "#def2d9", "#def2d8", "#ddf2d7", "#dcf2d7", "#dcf1d6", "#dbf1d5", "#daf1d5", "#daf0d4", "#d9f0d3", "#d8f0d3", "#d8f0d2", "#d7efd1", "#d6efd1", "#d6efd0", "#d5efcf", "#d4eecf", "#d3eece", "#d3eecd", "#d2edcd", "#d1edcc", "#d0edcb", "#d0edcb", "#cfecca", "#ceecca", "#cdecc9", "#cdebc8", "#ccebc8", "#cbebc7", "#caeac6", "#c9eac6", "#c8eac5", "#c7e9c5", "#c6e9c4", "#c5e8c4", "#c5e8c3", "#c4e8c2", "#c3e7c2", "#c2e7c1", "#c1e7c1", "#c0e6c0", "#bfe6c0", "#bde5bf", "#bce5bf", "#bbe5be", "#bae4be", "#b9e4be", "#b8e3bd", "#b7e3bd", "#b6e2bd", "#b5e2bc", "#b3e1bc", "#b2e1bc", "#b1e1bb", "#b0e0bb", "#afe0bb", "#aedfbb", "#acdfbb", "#abdeba", "#aadeba", "#a9ddba", "#a7ddba", "#a6dcba", "#a5dcba", "#a3dbba", "#a2dbba", "#a1daba", "#a0daba", "#9ed9bb", "#9dd9bb", "#9cd8bb", "#9ad8bb", "#99d7bb", "#98d7bc", "#96d6bc", "#95d6bc", "#93d5bd", "#92d5bd", "#91d4bd", "#8fd3be", "#8ed3be", "#8dd2be", "#8bd2bf", "#8ad1bf", "#88d1c0", "#87d0c0", "#86cfc1", "#84cfc1", "#83cec1", "#81cec2", "#80cdc2", "#7fccc3", "#7dccc3", "#7ccbc4", "#7acac4", "#79cac5", "#77c9c5", "#76c8c6", "#75c8c6", "#73c7c7", "#72c6c7", "#70c5c7", "#6fc5c8", "#6ec4c8", "#6cc3c9", "#6bc3c9", "#69c2ca", "#68c1ca", "#67c0ca", "#65bfcb", "#64bfcb", "#63becb", "#61bdcc", "#60bccc", "#5fbbcc", "#5dbacc", "#5cb9cc", "#5ab9cd", "#59b8cd", "#58b7cd", "#57b6cd", "#55b5cd", "#54b4cd", "#53b3cd", "#51b2cd", "#50b1cd", "#4fb0cd", "#4eafcd", "#4caecd", "#4badcc", "#4aaccc", "#49abcc", "#48aacc", "#46a9cb", "#45a8cb", "#44a6cb", "#43a5ca", "#42a4ca", "#41a3c9", "#3fa2c9", "#3ea1c8", "#3da0c8", "#3c9ec7", "#3b9dc7", "#3a9cc6", "#399bc6", "#379ac5", "#3699c5", "#3597c4", "#3496c4", "#3395c3", "#3294c2", "#3193c2", "#3092c1", "#2f90c0", "#2d8fc0", "#2c8ebf", "#2b8dbf", "#2a8cbe", "#298abd", "#2889bd", "#2788bc", "#2687bc", "#2586bb", "#2485ba", "#2383ba", "#2282b9", "#2081b9", "#1f80b8", "#1e7fb7", "#1d7eb7", "#1c7db6", "#1b7bb5", "#1a7ab5", "#1979b4", "#1978b3", "#1877b3", "#1776b2", "#1674b1", "#1573b0", "#1472b0", "#1371af", "#1370ae", "#126fad", "#116dac", "#106cac", "#106bab", "#0f6aaa", "#0e69a9", "#0e67a8", "#0d66a7", "#0d65a6", "#0c64a5", "#0c63a4", "#0c61a3", "#0b60a2", "#0b5fa1", "#0a5ea0", "#0a5d9e", "#0a5b9d", "#0a5a9c", "#09599b", "#09589a", "#095699", "#095597", "#095496", "#095395", "#085294", "#085092", "#084f91", "#084e90", "#084d8e", "#084b8d", "#084a8c", "#08498a", "#084889", "#084688", "#084586", "#084485", "#084384", "#084182", "#084081"];
    const arr3 = ["#ffffe5", "#ffffe4", "#fffee2", "#fffee1", "#fffee0", "#fffedf", "#fffddd", "#fffddc", "#fffddb", "#fffdd9", "#fffcd8", "#fffcd7", "#fffcd6", "#fffcd4", "#fffbd3", "#fffbd2", "#fffbd0", "#fffacf", "#ffface", "#fffacc", "#fff9cb", "#fff9ca", "#fff9c9", "#fff8c7", "#fff8c6", "#fff8c5", "#fff7c3", "#fff7c2", "#fff7c1", "#fff6bf", "#fff6be", "#fff5bd", "#fff5bc", "#fff4ba", "#fff4b9", "#fff4b8", "#fff3b6", "#fff3b5", "#fff2b4", "#fff2b2", "#fff1b1", "#fff1af", "#fff0ae", "#ffefad", "#ffefab", "#ffeeaa", "#ffeea9", "#ffeda7", "#feeca6", "#feeca4", "#feeba3", "#feeaa1", "#feeaa0", "#fee99e", "#fee89d", "#fee89b", "#fee79a", "#fee698", "#fee697", "#fee595", "#fee493", "#fee392", "#fee390", "#fee28e", "#fee18d", "#fee08b", "#fedf89", "#fedf87", "#fede86", "#fedd84", "#fedc82", "#fedb80", "#feda7e", "#fed97d", "#fed87b", "#fed779", "#fed777", "#fed675", "#fed573", "#fed471", "#fed370", "#fed26e", "#fed16c", "#fed06a", "#fecf68", "#fece66", "#fecd64", "#fecc63", "#fecb61", "#fec95f", "#fec85d", "#fec75b", "#fec65a", "#fec558", "#fec456", "#fec355", "#fec253", "#fec051", "#febf50", "#febe4e", "#febd4d", "#febc4b", "#feba4a", "#feb948", "#feb847", "#feb746", "#feb544", "#feb443", "#feb341", "#feb240", "#feb03f", "#feaf3e", "#feae3c", "#feac3b", "#fdab3a", "#fdaa39", "#fda938", "#fda737", "#fda635", "#fda534", "#fda333", "#fca232", "#fca131", "#fc9f30", "#fc9e2f", "#fc9d2e", "#fb9b2d", "#fb9a2c", "#fb992b", "#fb972a", "#fa962a", "#fa9529", "#fa9328", "#f99227", "#f99126", "#f89025", "#f88e25", "#f88d24", "#f78c23", "#f78a22", "#f68921", "#f68821", "#f58620", "#f5851f", "#f4841f", "#f3831e", "#f3811d", "#f2801c", "#f27f1c", "#f17e1b", "#f07c1a", "#f07b1a", "#ef7a19", "#ee7918", "#ee7718", "#ed7617", "#ec7517", "#eb7416", "#eb7215", "#ea7115", "#e97014", "#e86f14", "#e86e13", "#e76c12", "#e66b12", "#e56a11", "#e46911", "#e36810", "#e2670f", "#e1650f", "#e1640e", "#e0630e", "#df620d", "#de610d", "#dd600c", "#dc5f0c", "#db5e0b", "#da5d0b", "#d95b0a", "#d75a0a", "#d65909", "#d55809", "#d45708", "#d35608", "#d25508", "#d15407", "#cf5307", "#ce5207", "#cd5106", "#cc5006", "#ca4f06", "#c94e05", "#c84d05", "#c74c05", "#c54b05", "#c44b05", "#c24a04", "#c14904", "#c04804", "#be4704", "#bd4604", "#bb4504", "#ba4504", "#b84404", "#b74304", "#b54203", "#b44103", "#b24103", "#b14003", "#af3f03", "#ae3e03", "#ac3e03", "#ab3d03", "#a93c03", "#a83b04", "#a63b04", "#a43a04", "#a33904", "#a13904", "#a03804", "#9e3704", "#9c3704", "#9b3604", "#993604", "#983504", "#963404", "#943404", "#933304", "#913304", "#903204", "#8e3104", "#8c3104", "#8b3005", "#893005", "#882f05", "#862f05", "#842e05", "#832e05", "#812d05", "#802d05", "#7e2c05", "#7c2c05", "#7b2b05", "#792b05", "#782a05", "#762a05", "#742905", "#732905", "#712806", "#702806", "#6e2706", "#6c2706", "#6b2606", "#692606", "#682506", "#662506"];
    console.log(ar.length);

    const newArr = [];
    let counter = 0;
    function colorCollect(arr){
        arr.forEach((ele) => {
            if (counter === 20) {
                newArr.push(ele);
                counter = 0;
            }
            counter++;
        })
        return newArr
    }
   
    console.log(colorCollect(ar));

    
    //convert globe project to 2d-map project
    const projection = d3.geoMercator()
        .scale([410])
        .translate([980, 800]);

    //draw map from json file
    //draw cities on the map from csv file
    d3.csv("data/cities.csv", (cities => {
        d3.json("data/province_map.json", (map => {
            const canada = canvas2.selectAll('g')
                .data(map.features)
                .enter()
                .append('g')
                .attr('class', 'province');

            const paths = d3.geoPath()
                .projection(projection);

            //draw canada map
            const path = canada.append("path")
                .attr('d', paths)
                .attr('class', 'path')
                .attr('fill', 'white');

            //draw major cities
            const city = canvas2.selectAll('.cityDots')
                .data(cities)
                .enter()
                .append('circle')
                .attr('class', 'cityDots')
                .attr('r', 2)
                .attr('cx', city =>{
                    const coords1 = projection([city.lng, city.lat]);
                    return coords1[0];
                    })
                .attr('cy', city => {
                    const coords2 = projection([city.lng, city.lat]);
                    return coords2[1];
                    });
            
            //add city name label
            canvas2.selectAll('.cityName')
                .data(cities)
                .enter()
                .append('text')
                .attr('class', 'cityName')
                .attr('x', city => {
                    const coords3 = projection([city.lng, city.lat]);
                    return coords3[0];
                })
                .attr('y', city => {
                    const coords4 = projection([city.lng, city.lat]);
                    return coords4[1];
                })
                .text(d => d.city)
                .attr('dx', 1)
                .attr('dy', -2)
                .style('font-size', '13px')
                .style('text-shadow', '10px 10px 20px white');
             


            //color provinces according to d.VALUE( tourist number )
            d3.selectAll('.path')
                .data(dataSorted)
                .style("fill", function (d) { return colorScale(parseInt(d.VALUE)) })
                .on("mouseover", onMouseOver) // listener mouseover event
                .on("mouseout", onMouseOut); // listener mouseleave event

            d3.selectAll('.path')
                .append('text')
                .attr("transform", "translate(10, 20)")
                .text(d => { "hello" + d.GEO });
        }));

    }));
    
    // append group and insert axis
    d3.selectAll('.path')
        .attr('transform', 'translate(700, 50)')
        .call(yAxis);
}

let mapTooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

function onMouseOver(d, i) {
    mapTooltip.transition()
        .duration(0)
        .style("opacity", 0.9);
    mapTooltip.html(d.GEO + " on " + d.REF_DATE + "<br/>" + "tourists from overseas: " + d.VALUE + " persons")
        .style("left", (d3.event.pageX - 100) + "px")
        .style("top", (d3.event.pageY - 120) + "px");
}

//mouseout event listen function
function onMouseOut(d, i) {
    d3.selectAll('div.tooltip')
        .style('opacity', 0);
}
