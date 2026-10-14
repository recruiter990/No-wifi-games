  $(document).ready(function() {
            var oMain = new CMain({
                time_power_bar: 750, // TIME FOR FILL POWER BAR IN MILLISECONDS
                speed_effect_arrow: 60, //ANIMATION SPEED OF EFFECT ARROW IN FRAME PER SECONDS
                num_levels_for_ads: 1 //NUMBER OF TURNS PLAYED BEFORE AD SHOWING //
            });
            $(oMain).on("start_session", function(evt) {
                if (getParamValue('ctl-arcade') === "true") {
                    parent.__ctlArcadeStartSession();
                }
            });

            $(oMain).on("end_session", function(evt) {
                if (getParamValue('ctl-arcade') === "true") {
                    parent.__ctlArcadeEndSession();
                }
            });

            $(oMain).on("start_level", function(evt, iLevel) {
                if (getParamValue('ctl-arcade') === "true") {
                    parent.__ctlArcadeStartLevel({
                        level: iLevel
                    });
                }
            });

            $(oMain).on("restart_level", function(evt, iLevel) {
                if (getParamValue('ctl-arcade') === "true") {
                    parent.__ctlArcadeRestartLevel({
                        level: iLevel
                    });
                }
            });

            $(oMain).on("end_level", function(evt, iLevel) {
                if (getParamValue('ctl-arcade') === "true") {
                    parent.__ctlArcadeEndLevel({
                        level: iLevel
                    });
                }
            });

            $(oMain).on("save_score", function(evt, iScore, szMode) {
                if (getParamValue('ctl-arcade') === "true") {
                    parent.__ctlArcadeSaveScore({
                        score: iScore,
                        mode: szMode
                    });
                }
            });

            $(oMain).on("show_interlevel_ad", function(evt) {
                if (getParamValue('ctl-arcade') === "true") {
                    parent.__ctlArcadeShowInterlevelAD();
                }
            });

            $(oMain).on("share_event", function(evt, iScore) {
                if (getParamValue('ctl-arcade') === "true") {
                    parent.__ctlArcadeShareEvent({
                        img: TEXT_SHARE_IMAGE,
                        title: TEXT_SHARE_TITLE,
                        msg: TEXT_SHARE_MSG1 + iScore + TEXT_SHARE_MSG2,
                        msg_share: TEXT_SHARE_SHARE1 + iScore + TEXT_SHARE_SHARE1
                    });
                }
            });


            if (isIOS()) {
                setTimeout(function() {
                    sizeHandler();
                }, 200);
            } else {
                sizeHandler();
            }
        });