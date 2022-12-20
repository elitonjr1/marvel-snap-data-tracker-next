import React from "react";
import Layout from "../src/layout/Layout";
import NewsDetailsView from "../src/layout/components/NewsDetailsView";
import styled from 'styled-components';

const date = new Date();

const NewsDetails = () => {
    return <>
        <NewsPage>
            <NewsDetailsView title="Patch 8.7 New Variants and Unreleased Card Changes" description="Patch 8.7 New Variants and Unreleased Card Changes" publishDate={date} image="https://media.snap.fan/cdn-cgi/image/format=auto,width=896,height=504,quality=80,fit=cover,gravity=top/news/original_images/2022-11-08-patch-8-7-variants_copy.webp"></NewsDetailsView>
            <NewsDetailsView title="Patch 8.7 (November 3, 2022)" description="Honestly, there being a patch today was not really surprising to a lot of people. If you'd like to stay in the loop in the future, come check out the snap.fan community discord." publishDate={date} image="https://media.snap.fan/cdn-cgi/image/format=auto,width=896,height=504,quality=80,fit=cover,gravity=top/news/original_images/novpatch.jpg"></NewsDetailsView>
            <NewsDetailsView title="Wakanda Forever" description="As the first season since global release comes to a close, we look into the future to see what awaits us...but before we do that, a fair warning for players fresh along with the global release (Oh, added fair warning, there are some big spoilers at the bottom of this article about new locations!):

When the new season begins, the old season pass will disappear along with all of your old season pass missions, whether you finished them or not. As such, if you want to maximize your value over this weekend, try your best to complete your season pass quests and get that season pass experience locked in. If you did not buy the season pass, the levels you are hoping to hit are 45 for 500credits and 48 for a free variant. If you did buy the season pass, then level 49 gives 500 gold and 50 gives the Miles Morales variant." publishDate={date} image="https://media.snap.fan/cdn-cgi/image/format=auto,width=896,height=504,quality=80,fit=cover,gravity=top/news/original_images/WakandaForeverSeason_HjJVA2I.png"></NewsDetailsView>
        </NewsPage>
    </>
}

export default NewsDetails;

const NewsPage = styled.div``

