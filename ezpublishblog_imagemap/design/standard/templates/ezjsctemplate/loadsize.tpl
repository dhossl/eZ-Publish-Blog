{def $sizes = ezini( 'AliasSettings', 'AliasList', 'image.ini')}
<select id="imagemap-imagesize">
{foreach $sizes as $key => $value}
    <option value="{$value}">{$value}</option>
{/foreach}
</select>