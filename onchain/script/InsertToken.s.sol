// SPDX-License-Identifier: MIT
pragma solidity >=0.8.23 <0.9.0;

import { BaseScript } from "./Base.s.sol";
import { MugenToken } from "../src/MugenToken.sol";
import { MugenRecipe } from "../src/MugenRecipe.sol";
// import { NFTDescriptor } from "../src/utils/NFTDescriptor.sol";
import { console2 } from "forge-std/console2.sol";

struct MetadataTest {
    uint256 id;
    string name;
    string imageText;
}

contract InsertTokenScript is BaseScript {
    function run() public broadcast {
        MugenRecipe recipe = MugenRecipe(0xB44AAFf4640FE81BA7a6ae5eb6804d3d39CA902F);
        MetadataTest[190] memory metadatas = [
            MetadataTest(401, "Hawai", "&#x1F5FF; Hawai"),
            MetadataTest(402, "Tokyo Tower", "&#x1F5FC; Tokyo Tower"),
            MetadataTest(403, "Fortune Cookie", "&#x1F960; Fortune Cookie"),
            MetadataTest(404, "Koala", "&#x1F428; Koala"),
            MetadataTest(405, "Grand Line", "&#x1f3f4;&#x200d;&#x2620;&#xfe0f; Grand Line"),
            MetadataTest(406, "Lady Bug", "&#x1F41E; Lady Bug"),
            MetadataTest(407, "Statue Of Liberty", "&#x1F5FD; Statue Of Liberty"),
            MetadataTest(408, "Honey", "&#x1F36F; Honey"),
            MetadataTest(409, "Panda", "&#x1F43C; Panda"),
            MetadataTest(410, "Paradise", "&#x1f3f4;&#x200d;&#x2620;&#xfe0f; Paradise"),
            MetadataTest(411, "Diamond Stone", "&#x1F48D; Diamond Stone"),
            MetadataTest(412, "Wedding", "&#x1F492; Wedding"),
            MetadataTest(413, "Candy", "&#x1F36C; Candy"),
            MetadataTest(414, "Kangaroo", "&#x1F998; Kangaroo"),
            MetadataTest(415, "New World", "&#x1f3f4;&#x200d;&#x2620;&#xfe0f; New World"),
            MetadataTest(416, "Copper", "&#x1F5FF; Copper"),
            MetadataTest(417, "Mosque", "&#x1F54C; Mosque"),
            MetadataTest(418, "Taco", "&#x1F32E; Taco"),
            MetadataTest(419, "Badger", "&#x1F9A1; Badger"),
            MetadataTest(420, "Exact Location Unknown", "&#x1f3f4;&#x200d;&#x2620;&#xfe0f; Exact Location Unknown"),
            MetadataTest(421, "Key Ring", "&#x1F5DD; Key Ring"),
            MetadataTest(422, "Church", "&#x26EA; Church"),
            MetadataTest(423, "Burrito", "&#x1F32F; Burrito"),
            MetadataTest(424, "Paw Prints", "&#x1F43E; Paw Prints"),
            MetadataTest(425, "Sky Ocean", "&#x1f3f4;&#x200d;&#x2620;&#xfe0f; Sky Ocean"),
            MetadataTest(426, "Mochi", "&#x1F361; Mochi"),
            MetadataTest(427, "Traffic Light", "&#x1F6A5; Traffic Light"),
            MetadataTest(428, "Lollipop", "&#x1F36D; Lollipop"),
            MetadataTest(429, "Turkey", "&#x1F983; Turkey"),
            MetadataTest(430, "The White Sea", "&#x1f3f4;&#x200d;&#x2620;&#xfe0f; The White Sea"),
            MetadataTest(431, "Injury", "&#x1F915; Injury"),
            MetadataTest(432, "Factory", "&#x1F3ED; Factory"),
            MetadataTest(433, "Pizza", "&#x1F355; Pizza"),
            MetadataTest(434, "Rooster", "&#x1F413; Rooster"),
            MetadataTest(435, "The White-White Sea", "&#x1f3f4;&#x200d;&#x2620;&#xfe0f; The White-White Sea"),
            MetadataTest(436, "Hakone", "&#x2668; Hakone"),
            MetadataTest(437, "Niseko", "&#x2668; Niseko"),
            MetadataTest(438, "Corn", "&#x1F33D; Corn"),
            MetadataTest(439, "Hatching Chick", "&#x1F423; Hatching Chick"),
            MetadataTest(440, "Sea Floor", "&#x1f3f4;&#x200d;&#x2620;&#xfe0f; Sea Floor"),
            MetadataTest(441, "Leaflet", "&#x1F33F; Leaflet"),
            MetadataTest(442, "Shrine", "&#x26E9; Shrine"),
            MetadataTest(443, "Hamburger", "&#x1F354; Hamburger"),
            MetadataTest(444, "Baby Chick", "&#x1F424; Baby Chick"),
            MetadataTest(445, "The Moon", "&#x1f3f4;&#x200d;&#x2620;&#xfe0f; The Moon"),
            MetadataTest(446, "Window", "&#x1F6AA; Window"),
            MetadataTest(447, "Ise Jingu", "&#x26E9; Ise Jingu"),
            MetadataTest(448, "Cucumber", "&#x1F952; Cucumber"),
            MetadataTest(449, "Unicorn", "&#x1F984; Unicorn"),
            MetadataTest(450, "Exact Location Unknown", "&#x1f3f4;&#x200d;&#x2620;&#xfe0f; Exact Location Unknown"),
            MetadataTest(451, "Matchapowder", "&#x1F375; Matchapowder"),
            MetadataTest(452, "Matcha Cake", "&#x1F375; Matcha Cake"),
            MetadataTest(453, "Leafy Green", "&#x1F96C; Leafy Green"),
            MetadataTest(454, "Zebra", "&#x1F993; Zebra"),
            MetadataTest(455, "Non-Canon Locations", "&#x1f3f4;&#x200d;&#x2620;&#xfe0f; Non-Canon Locations"),
            MetadataTest(456, "Kiss", "&#x1F48B; Kiss"),
            MetadataTest(457, "Angry", "&#x1F621; Angry"),
            MetadataTest(458, "Peanuts", "&#x1F95C; Peanuts"),
            MetadataTest(459, "Deer", "&#x1F98C; Deer"),
            MetadataTest(460, "Dressrosa", "&#x1f3f4;&#x200d;&#x2620;&#xfe0f; Dressrosa"),
            MetadataTest(461, "Santa", "&#x1F385; Santa"),
            MetadataTest(462, "Ghost", "&#x1F47B; Ghost"),
            MetadataTest(463, "Chestnut", "&#x1F330; Chestnut"),
            MetadataTest(464, "Ox", "&#x1F402; Ox"),
            MetadataTest(465, "Water 7", "&#x1f3f4;&#x200d;&#x2620;&#xfe0f; Water 7"),
            MetadataTest(466, "Shrimp", "&#x1F990; Shrimp"),
            MetadataTest(467, "Camera", "&#x1F4F8; Camera"),
            MetadataTest(468, "Pretzel", "&#x1F968; Pretzel"),
            MetadataTest(469, "Cow", "&#x1F404; Cow"),
            MetadataTest(470, "Totto Land", "&#x1f3f4;&#x200d;&#x2620;&#xfe0f; Totto Land"),
            MetadataTest(471, "Rubber", "&#x1F518; Rubber"),
            MetadataTest(472, "Rasing Car", "&#x1F3CE; Rasing Car"),
            MetadataTest(473, "Sunflower", "&#x1F33B; Sunflower"),
            MetadataTest(474, "Monkey", "&#x1F412; Monkey"),
            MetadataTest(475, "Zou", "&#x1f3f4;&#x200d;&#x2620;&#xfe0f; Zou"),
            MetadataTest(476, "Noodle", "&#x1F35C; Noodle"),
            MetadataTest(477, "Ramen Bar", "&#x1F35C; Ramen Bar"),
            MetadataTest(478, "Eggplant", "&#x1F346; Eggplant"),
            MetadataTest(479, "Gorilla", "&#x1F98D; Gorilla"),
            MetadataTest(480, "Little Garden", "&#x1f3f4;&#x200d;&#x2620;&#xfe0f; Little Garden"),
            MetadataTest(481, "Power", "&#x1F4AA; Power"),
            MetadataTest(482, "Stone Man", "&#x1F471; Stone Man"),
            MetadataTest(483, "Cheese", "&#x1F9C0; Cheese"),
            MetadataTest(484, "Fencing", "&#x1F93A; Fencing"),
            MetadataTest(485, "Fishman Island", "&#x1f3f4;&#x200d;&#x2620;&#xfe0f; Fishman Island"),
            MetadataTest(486, "Rainly", "&#x2614; Rainly"),
            MetadataTest(487, "Aws", "&#x2601; Aws"),
            MetadataTest(488, "Bacon", "&#x1F953; Bacon"),
            MetadataTest(489, "Horse Racing", "&#x1F3C7; Horse Racing"),
            MetadataTest(490, "Skypeia", "&#x1f3f4;&#x200d;&#x2620;&#xfe0f; Skypeia"),
            MetadataTest(491, "Potato Tips ", "&#x1F954; Potato Tips "),
            MetadataTest(492, "Potetohead", "&#x1F954; Potetohead"),
            MetadataTest(493, "French Fries", "&#x1F35F; French Fries"),
            MetadataTest(494, "Skier", "&#x26F7; Skier"),
            MetadataTest(495, "Shell Town", "&#x1f3f4;&#x200d;&#x2620;&#xfe0f; Shell Town"),
            MetadataTest(496, "Wood", "&#x1F332; Wood"),
            MetadataTest(497, "Tabel", "&#x132B3; Tabel"),
            MetadataTest(498, "Grapes", "&#x1F347; Grapes"),
            MetadataTest(499, "Snowboarder", "&#x1F3C2; Snowboarder"),
            MetadataTest(500, "Shimoshiki Village", "&#x1f3f4;&#x200d;&#x2620;&#xfe0f; Shimoshiki Village"),
            MetadataTest(501, "Spice", "&#x1F336; Spice"),
            MetadataTest(502, "Spicy Curry", "&#x1F35B; Spicy Curry"),
            MetadataTest(503, "Cactus", "&#x1F335; Cactus"),
            MetadataTest(504, "Golfing", "&#x1F3CC; Golfing"),
            MetadataTest(505, "Orange Town", "&#x1f3f4;&#x200d;&#x2620;&#xfe0f; Orange Town"),
            MetadataTest(506, "Akanbee", "&#x1F61D; Akanbee"),
            MetadataTest(507, "Newjeans", "&#x1F467; Newjeans"),
            MetadataTest(508, "Pod", "&#x1F372; Pod"),
            MetadataTest(509, "Man Biking", "&#x1F6B4; Man Biking"),
            MetadataTest(510, "Syrup Village", "&#x1f3f4;&#x200d;&#x2620;&#xfe0f; Syrup Village"),
            MetadataTest(511, "Rockice", "&#x2744; Rockice"),
            MetadataTest(512, "Endless Rain", "&#x1F327; Endless Rain"),
            MetadataTest(513, "Popcorn", "&#x1F37F; Popcorn"),
            MetadataTest(514, "Person Cartwheeling", "&#x1F938; Person Cartwheeling"),
            MetadataTest(515, "Arlong Park", "&#x1f3f4;&#x200d;&#x2620;&#xfe0f; Arlong Park"),
            MetadataTest(516, "Baby Seed", "&#x1F476;&#x1F331; Baby Seed"),
            MetadataTest(517, "Easy Delivery", "&#x1F469; Easy Delivery"),
            MetadataTest(518, "Canned Food", "&#x1F96B; Canned Food"),
            MetadataTest(519, "People Wrestling", "&#x1F93C; People Wrestling"),
            MetadataTest(520, "Cocoyashi Village", "&#x1f3f4;&#x200d;&#x2620;&#xfe0f; Cocoyashi Village"),
            MetadataTest(521, "Bonus", "&#x1F4B0; Bonus"),
            MetadataTest(522, "School", "&#x1F3EB; School"),
            MetadataTest(523, "Cherry Blossom", "&#x1F338; Cherry Blossom"),
            MetadataTest(524, "Person Playing Water Polo", "&#x1F93D; Person Playing Water Polo"),
            MetadataTest(525, "Gosa Village", "&#x1f3f4;&#x200d;&#x2620;&#xfe0f; Gosa Village"),
            MetadataTest(526, "Bear Toy", "&#x1F9F8; Bear Toy"),
            MetadataTest(527, "Baby High Chair", "&#x1F37C; Baby High Chair"),
            MetadataTest(528, "Bento Box", "&#x1F371; Bento Box"),
            MetadataTest(529, "Person Playing Handball", "&#x1F93E; Person Playing Handball"),
            MetadataTest(530, "Lougetown", "&#x1f3f4;&#x200d;&#x2620;&#xfe0f; Lougetown"),
            MetadataTest(531, "Sad", "&#x1F32A; Sad"),
            MetadataTest(532, "Rolling Stones", "&#x1F311; Rolling Stones"),
            MetadataTest(533, "Oden", "&#x1F367; Oden"),
            MetadataTest(534, "Person Juggling", "&#x1F9D8; Person Juggling"),
            MetadataTest(535, "Lyneel", "&#x1f3f4;&#x200d;&#x2620;&#xfe0f; Lyneel"),
            MetadataTest(536, "Tornadocash", "&#x1F32A; Tornadocash"),
            MetadataTest(537, "New Moon", "&#x1F311; New Moon"),
            MetadataTest(538, "Shaved Ice", "&#x1F367; Shaved Ice"),
            MetadataTest(539, "Person Yoga", "&#x1F9D8; Person Yoga"),
            MetadataTest(540, "Bliss Kingdom", "&#x1f3f4;&#x200d;&#x2620;&#xfe0f; Bliss Kingdom"),
            MetadataTest(541, "Yakitori", "&#x1F414; Yakitori"),
            MetadataTest(542, "Star", "&#x2B50; Star"),
            MetadataTest(543, "Cupcake", "&#x1F9C1; Cupcake"),
            MetadataTest(544, "Mosquito", "&#x1F99F; Mosquito"),
            MetadataTest(545, "Karate Island", "&#x1f3f4;&#x200d;&#x2620;&#xfe0f; Karate Island"),
            MetadataTest(546, "69", "&#x36;&#x20E3; 69"),
            MetadataTest(547, "Ferris Wheel", "&#x1F3A1; Ferris Wheel"),
            MetadataTest(548, "Rose", "&#x1F339; Rose"),
            MetadataTest(549, "T-Rex", "&#x1F996; T-Rex"),
            MetadataTest(550, "Saint Reia", "&#x1f3f4;&#x200d;&#x2620;&#xfe0f; Saint Reia"),
            MetadataTest(551, "Scrambled Eggs", "&#x1F95A; Scrambled Eggs"),
            MetadataTest(552, "Glowing Star", "&#x1F31F; Glowing Star"),
            MetadataTest(553, "Hibiscus", "&#x1F33A; Hibiscus"),
            MetadataTest(554, "Peacock", "&#x1F99A; Peacock"),
            MetadataTest(555, "Ohara", "&#x1f3f4;&#x200d;&#x2620;&#xfe0f; Ohara"),
            MetadataTest(556, "Jackpot", "&#x1F911; Jackpot"),
            MetadataTest(557, "Shooting Star", "&#x1F320; Shooting Star"),
            MetadataTest(558, "Sake", "&#x1F376; Sake"),
            MetadataTest(559, "Turtle", "&#x1F422; Turtle"),
            MetadataTest(560, "Baratie", "&#x1f3f4;&#x200d;&#x2620;&#xfe0f; Baratie"),
            MetadataTest(561, "Superstar", "&#x2B50; Superstar"),
            MetadataTest(562, "Milky Way", "&#x1F30C; Milky Way"),
            MetadataTest(563, "Whiskey", "&#x1F943; Whiskey"),
            MetadataTest(564, "Vitalik Buterin", "&#x1F6B6; Vitalik Buterin"),
            MetadataTest(565, "Nanohana", "&#x1f3f4;&#x200d;&#x2620;&#xfe0f; Nanohana"),
            MetadataTest(566, "Super Mario", "&#x2B50; Super Mario"),
            MetadataTest(567, "Minecraft", "&#x1F5FF; Minecraft"),
            MetadataTest(568, "Senzu", "&#x1F331; Senzu"),
            MetadataTest(569, "Goku", "&#x1F9E1; Goku"),
            MetadataTest(570, "Belly", "&#x1f3f4;&#x200d;&#x2620;&#xfe0f; Belly"),
            MetadataTest(571, "Rocket Toy", "&#x1F680; Rocket Toy"),
            MetadataTest(572, "Rosetta Stone", "&#x1F5FF; Rosetta Stone"),
            MetadataTest(573, "Spicy Ramen", "&#x1F680; Spicy Ramen"),
            MetadataTest(574, "Jeff Bezos", "&#x1F9E1; Jeff Bezos"),
            MetadataTest(575, "Manga", "&#x1f3f4;&#x200d;&#x2620;&#xfe0f; Manga"),
            MetadataTest(576, "Ketchup", "&#x1F534; Ketchup"),
            MetadataTest(577, "Statue Of Doge", "&#x1F5FF;&#x1F415; Statue Of Doge"),
            MetadataTest(578, "Doge Food", "&#x1F32D;&#x1F415; Doge Food"),
            MetadataTest(579, "Bill Gates", "&#x1F9E1; Bill Gates"),
            MetadataTest(580, "Eiichiro Oda", "&#x1f3f4;&#x200d;&#x2620;&#xfe0f; Eiichiro Oda"),
            MetadataTest(581, "Moonshot", "&#x1F31D; Moonshot"),
            MetadataTest(582, "Moonstone", "&#x1F31D; Moonstone"),
            MetadataTest(583, "Moon Food", "&#x1F31D; Moon Food"),
            MetadataTest(584, "Richard Branson", "&#x1F9E1; Richard Branson"),
            MetadataTest(585, "Kabuki", "&#x1f3f4;&#x200d;&#x2620;&#xfe0f; Kabuki"),
            MetadataTest(586, "Starlink", "&#x1F30C; Starlink"),
            MetadataTest(587, "Meteorite", "&#x1F5FF; Meteorite"),
            MetadataTest(588, "Space Food", "&#x1F30C; Space Food"),
            MetadataTest(589, "Elon Musk", "&#x1F9E1; Elon Musk"),
            MetadataTest(590, "World Government", "&#x1f3f4;&#x200d;&#x2620;&#xfe0f; World Government")
        ];
        uint256 len = metadatas.length;

        uint256[] memory ids = new uint256[](len);
        string[] memory names = new string[](len);
        string[] memory imageTexts = new string[](len);

        for (uint256 i = 0; i < len; i++) {
            ids[i] = metadatas[i].id;
            names[i] = metadatas[i].name;
            imageTexts[i] = metadatas[i].imageText;
        }
        recipe.setDefaultMetadatas(ids, names, imageTexts);
    }
}
