import React from "react";
import {FormattedMessage, injectIntl} from "react-intl";

const IntlMessage = props => <FormattedMessage  locale="fr-FR" {...props} />;
export default injectIntl(IntlMessage, {
    withRef: false
});
